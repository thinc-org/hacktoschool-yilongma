import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import CourseBox from './CourseBox';
import { useNavigate } from 'react-router-dom';
import CourseAdder from './CourseAdder';
import useDebounce from './useDebounce';
import { Skeleton } from '@mui/material';


const pb = new PocketBase('https://pb.jjus.dev');


function CoursesList() {
    let navigate = useNavigate(); 
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [coursesList, setCoursesList] = useState<any>([]);

    var rolefilter = "";
    if (pb.authStore.model!.role.includes('instructor')) {
        rolefilter = 'instructor ~ "' + pb.authStore.model!.id + '"'
    }


    

    const getCoursesList = async (search:string) => {
        let filterArray = []
        if (rolefilter) {filterArray.push(rolefilter)}
        if (search) {filterArray.push(`(name ~ "${search}" || instructor.name ~ "${search}")`)}
        console.log(filterArray.join(" && "));
        const resultList = await pb.collection('courses').getList(1, 50, {
            filter: filterArray.join(" && "),
            expand: 'instructor'
        })
        console.log(resultList.items);
        setCoursesList(resultList.items)
        setLoading(false)
    }

    useDebounce(() => {
        setLoading(true)
        getCoursesList(search);
      }, [search], 500
    );

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getCoursesList(search);
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
                        <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={search} placeholder="Search" onChange={(e) => {setSearch(e.target.value)}}/>
                    </div>
                </div>

                <div className='max-w-full'>
                    
                    {loading && <div className="min-h-64 mt-8"><Skeleton variant="rectangular" animation="wave" height={150}/></div>
                    }
                    {!loading &&
                        coursesList.map((data: { id: any; name: any; expand: { instructor: { name: any; }; }; }, index: number) => {
                            
                            return (
                                <CourseBox key={index} id={data.id} name={data.name} instructor={data.expand.instructor.name}/>
                            )
                        })
                    }
                </div>
            
            </div>
            
        </div>
    )
}

export default CoursesList