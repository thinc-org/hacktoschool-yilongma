import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PocketBase from 'pocketbase'
import StudentList from './StudentList'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const pb = new PocketBase('https://pb.jjus.dev');

const Course = () => {
    let { id } = useParams();
    let navigate = useNavigate(); 
    const cookie = Cookies.get('token')

    if (!cookie) {
        navigate('/login');
    }

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

    const enrolling = async () => {
        const record = await pb.collection('courses').getOne(id || "", {
            expand: 'instructor,student',
        });
        var newStudentArray = record.student || []
        newStudentArray.push(pb.authStore.model!.id)

        var sendData = {
            "id": record.id,
            "name": record.name,
            "instructor": record.instructor,
            "thumbnail" : record.thumbnail || "",
            "description": record.description || "",
            "student": newStudentArray,
        };

        try {
            const newRecord = await pb.collection('courses').update(id || "", sendData)
            console.log(newRecord)
            Swal.fire({
                title: "Success",
                text: 'You are now joined this courses!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                window.location.reload()
            })
        }
        catch {
            Swal.fire({
                title:'Error', 
                text:'Please try again later', 
                icon:'error',
                showConfirmButton: false,
                timer: 2000})
        }
        
            
        



    }

    useEffect(() => {
        getCourseData();
    }, [])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4]'>
            <div className='flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className='flex flex-row rounded-lg bg-[#FFFFFF] h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                    <img src="https://picsum.photos/200/300" className='h-64 w-64 rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                    <div className='flex flex-col'>
                        <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-4 overflow-hidden whitespace-pre-line">{courseData.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-3 font-bold overflow-hidden whitespace-pre-line">Instructor: {courseData.expand.instructor.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-auto whitespace-pre-line">{courseData.description}</p>
                        <div className="flex flex-col px-8 py-2">
                            {
                                ((pb.authStore.model!.role).includes('student'))?
                                    (!courseData.student.includes(pb.authStore.model!.id)?
                                        <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" onClick={enrolling}>Enroll</button>:
                                        <button className="bg-[#585858] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline disabled">Enrolled</button>):
                                    ""
                            }
                        </div>

                    </div>
                </div>
                {pb.authStore.model!.role.includes('instructor')?<StudentList data={courseData}/>:""}
            </div>
        </div>
        
    )

}

export default Course