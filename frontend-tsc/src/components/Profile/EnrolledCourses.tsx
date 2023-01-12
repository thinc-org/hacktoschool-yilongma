import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import moment from 'moment'

const pb = new PocketBase('https://pb.jjus.dev');

const EnrolledCourses = () => {

    let navigate = useNavigate();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);

    const [enrolledCoursesData, setEnrolledCoursesData] = useState<any>([]);

    const getEnrolledCoursesData = async () => {
        const records = await pb.collection('courses').getFullList(200 /* batch size */, {
            filter: 'student ~ "'+pb.authStore.model!.id+'"',
            expand: 'instructor',
        });
        setEnrolledCoursesData(records)
    }

    
    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getEnrolledCoursesData();
    }, [])

    return (

        <div className='flex flex-col px-2 py-2'>
            <div className='flex flex-col items-center justify-center'>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Enrolled Courses</label>
            </div>
            <div className="flex flex-col px-8 py-4 max-h-[60rem] overflow-auto font-semibold text-[1rem]">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className={pb.authStore.model!.role.includes('instructor') ? "w-[60%] px-4 py-2" : "w-[70%] px-4 py-2"}>Name</th>
                                <th className={pb.authStore.model!.role.includes('instructor') ? "w-[20%] px-4 py-2" : "w-[30%] px-4 py-2"}>Instructor</th>
                                {pb.authStore.model!.role.includes('instructor') && <th className="w-[20%] px-4 py-2">Operation</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enrolledCoursesData.map((data: any, index: number) => {
                                    return (
                                        <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]">
                                            <td className="px-4 py-2" onClick={() => {navigate(`/courses/${data.id}`)}}>{data.name}</td>
                                            <td className="px-4 py-2" onClick={() => {navigate(`/courses/${data.id}`)}}>{data.expand.instructor.name}</td>
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

export default EnrolledCourses