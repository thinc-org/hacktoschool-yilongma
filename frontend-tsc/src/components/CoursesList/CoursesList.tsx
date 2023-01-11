import React, { useEffect, useState } from 'react'
import PocketBase from 'pocketbase'
import CourseBox from './CourseBox';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import CourseAdder from './CourseAdder';


const pb = new PocketBase('https://pb.jjus.dev');


function CoursesList() {
    let navigate = useNavigate(); 
    const cookie = Cookies.get('token')

    if (!cookie) {
        navigate('/login');
    }

    var rolefilter = "";
    if (pb.authStore.model!.role.includes('instructor')) {
        rolefilter = 'instructor ~ "' + pb.authStore.model!.id + '"'
    }


    const [coursesList, setCoursesList] = useState<any>([]);

    const getCoursesList = async () => {
        const resultList = await pb.collection('courses').getList(1, 50, {
            filter: rolefilter,
            expand: 'instructor'
        })
        setCoursesList(resultList.items)
    }

    

    useEffect(() => {
        getCoursesList();
    }, [])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4]'>
            <div className='flex flex-col p-6 md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>

                {pb.authStore.model!.role.includes('instructor') && <CourseAdder/>}

                <div>
                    <label className="block font-['DelaGothicOne'] text-[1.5rem] py-4 overflow-hidden whitespace-pre-line">
                        Courses
                    </label>
                </div>

                <div className='flex flex-col w-full justify-center'>
                    <div className="flex justify-center ">   
                        <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
                    </div>
                </div>

                <div className='max-w-full'>
                    {
                        coursesList.map((data: { id: any; name: any; expand: { instructor: { name: any; }; }; }) => {
                            console.log(data);
                            return (
                                <CourseBox id={data.id} name={data.name} instructor={data.expand.instructor.name}/>
                            )
                        })
                    }
                </div>
            
            </div>
            
        </div>
    )
}

export default CoursesList