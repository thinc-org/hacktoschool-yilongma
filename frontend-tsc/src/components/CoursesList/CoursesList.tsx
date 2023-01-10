import React, { useEffect, useState } from 'react'
import PocketBase from 'pocketbase'
import CourseBox from './CourseBox';


const pb = new PocketBase('https://pb.jjus.dev');


function CoursesList() {
    const [coursesList, setCoursesList] = useState([]);

    const getCoursesList = async () => {
        const resultList = await pb.collection('courses').getList(1, 50, {
            filter: '',
            expand: 'instructor'
        })
        setCoursesList(resultList.items)
    }

    

    useEffect(() => {
        getCoursesList();
    }, [])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4]'>
            <div className='flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className='flex flex-col w-full justify-center'>
                    <div className="flex justify-center ">   
                        <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
                    </div>
                </div>

                <div>
                    {
                        coursesList.map((data) => {
                            console.log(data);
                            return (
                                
                                <CourseBox name={data.name} instructor={data.expand.instructor.name}/>
                            )
                        })
                    }
                </div>
            
            </div>
            
        </div>
    )
}

export default CoursesList