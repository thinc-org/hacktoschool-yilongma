import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import moment from 'moment'

const pb = new PocketBase('https://pb.jjus.dev');

const InstructorCourses = () => {

    let navigate = useNavigate();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);

    const [InstructorCoursesData, setInstructorCoursesData] = useState<any>([]);

    const getInstructorCoursesData = async () => {
        const records = await pb.collection('courses').getFullList(200 /* batch size */, {
            filter: 'instructor = "'+pb.authStore.model!.id+'"',
        });
        setInstructorCoursesData(records)
    }

    
    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getInstructorCoursesData();
    }, [])

    return (

        <div className='flex flex-col px-2 py-2'>
            <div className="flex flex-row px-8 py-4 items-center justify-center">
                            <label className="block text-gray-700 text-lg font-bold mb-2">
                                My Courses
                            </label>
                        </div>
            <div className="flex flex-col px-8 py-4 max-h-[60rem] overflow-auto text-[1rem]">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-[70%] px-4 py-2">Name</th>
                                <th className="w-[30%] px-4 py-2">Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                InstructorCoursesData.map((data: any, index: number) => {
                                    return (
                                        <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]">
                                            <td className="px-4 py-2" onClick={() => {navigate(`/courses/${data.id}`)}}>{data.name}</td>
                                            <td className="px-4 py-2" onClick={() => {navigate(`/courses/${data.id}`)}}>{(new Date (data.created).toLocaleString())}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                
                
                
        </div>
    )



}

export default InstructorCourses