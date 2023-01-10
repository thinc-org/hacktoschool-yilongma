import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PocketBase from 'pocketbase'
import StudentList from './StudentList'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('https://pb.jjus.dev');

const Course = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const cookie = Cookies.get('token')

    if (!cookie) {
        navigate('/login');
    }

    console.log(pb.authStore.model!)

    const [courseData, setCourseData] = useState<any>({
        "id": "",
        "name": "",
        "instructor": "",
        "expand": {
            "instructor": {},
            "student": []
        },
        "description": "",
        "student": [],
    });

    const getCourseData = async () => {
        const record = await pb.collection('courses').getOne(id || "", {
            expand: 'instructor,student',
        });
        console.log(record)
        setCourseData(record)
    }

    useEffect(() => {

        getCourseData();
    }, [])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4 flex items-center md:items-start'>
            <div className='flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className="hidden md:grid grid-cols-[20vw_1fr] rounded-lg bg-[#FFFFFF] h-64 mt-8 mb-8 shadow hover:shadow-lg">
                    <img src="https://picsum.photos/200/300" className='w-full h-full rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                    <div className='flex flex-col max-h-64'>
                        <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-4 overflow-hidden whitespace-pre-line">{courseData.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-3 font-bold overflow-hidden whitespace-pre-line">Instructor: {courseData.expand.instructor.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-scroll whitespace-pre-line">{courseData.description}</p>
                        <div className="flex flex-col px-8 py-2">
                            {
                                ((pb.authStore.model!.role).includes('student')) ?
                                    (!courseData.student.includes(pb.authStore.model!.id) ?
                                        <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">Enroll</button> :
                                        <button className="bg-[#585858] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline disabled">Enrolled</button>) :
                                    ""
                            }
                        </div>
                    </div>
                </div>
                <div className="md:hidden grid grid-rows-[h-64_1fr] rounded-lg bg-[#FFFFFF] h-fit shadow hover:shadow-lg m-8">
                    <img src="https://picsum.photos/200/300" className='w-full h-full object-fill rounded-t-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                    <div className='flex flex-col m-4'>
                        <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-0 overflow-hidden whitespace-pre-line">{courseData.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-3 font-bold overflow-hidden whitespace-pre-line">Instructor: {courseData.expand.instructor.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-scroll whitespace-pre-line">{courseData.description}</p>
                        <div className="flex flex-col px-8 py-2 items-center">
                            {
                                ((pb.authStore.model!.role).includes('student')) ?
                                    (!courseData.student.includes(pb.authStore.model!.id) ?
                                        <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">Enroll</button> :
                                        <button className="bg-[#585858] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline disabled">Enrolled</button>) :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            {pb.authStore.model!.role.includes('instructor') ? <StudentList data={courseData} /> : ""}
        </div>

    )

}

export default Course