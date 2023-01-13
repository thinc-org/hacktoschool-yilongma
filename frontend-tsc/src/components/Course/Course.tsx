import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import PocketBase from 'pocketbase'
import StudentList from './StudentList'
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Announcement from './Announcement'
import Material from './Material'
import Video from './Video';
import Tag from '../Tags/Tag';
import GirlStudying from '../../assets/images/girl-studying.png?webp&imagetools'
import Assignment from './Assignment';
import MailSender from '../NotificationSender/MailSender';
import SlackSender from '../NotificationSender/SlackSender';
import DiscordSender from '../NotificationSender/DiscordSender';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const Course = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);



    var userId = pb.authStore.model!.id

    if (!token) {
        { return <Navigate to='/' /> }

    }

    const [courseData, setCourseData] = useState<any>({
        "id": "",
        "name": "",
        "instructor": "",
        "expand": {
            "instructor": {},
            "student": [],
            "announcement": [],
            "material": [],
            "video": [],
            "assignment": [],
            "tag": [],
        },
        "description": "",
        "student": [],
        "announcement": [],
        "material": [],
        "video": [],
        "assignment": [],
        "tag": [],
        "price": ""

    });

    var link = import.meta.env.VITE_STRIPE_BACKEND+ "/create-checkout-session?course=" + id +"&user=" + userId

    const getCourseData = async () => {
        const record = await pb.collection('courses').getOne(id || "", {
            expand: 'instructor,student,announcement,material,video,tag,assignment',
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
            "thumbnail": record.thumbnail || "",
            "description": record.description || "",
            "student": newStudentArray,
        };

        try {
            const newRecord = await pb.collection('courses').update(id || "", sendData)
            console.log("1")
            Swal.fire({
                title: "Success",
                text: 'You are now joined this courses!\nPlease wait for processing...',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            }).then(async () => {
                let tempEmail = ""
                const newNotification = await pb.collection('notifications').create({ "description": `"${pb.authStore.model!.name}" enrolled the course "${courseData.name}"` })
                await pb.collection('users').getOne(courseData.instructor).then(async (urec) => {
                    await pb.collection('users').update(courseData.instructor, { "notification": [...urec.notification, newNotification.id] })
                    tempEmail = urec.email
                })
                console.log("1")
                await MailSender(`Hack2School - GlobalTalk : New student enrolled in "${courseData.name}"`, `"${pb.authStore.model!.name}" enrolled the course "${courseData.name}"`, [tempEmail])
                await SlackSender(`"${pb.authStore.model!.name}" enrolled the course "${courseData.name}"`)
                await DiscordSender(`"${pb.authStore.model!.name}" enrolled the course "${courseData.name}"`)
                window.location.reload()
                
            })
        }
        catch {
            Swal.fire({
                title: 'Error',
                text: 'Please try again later',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }

    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getCourseData();
    }, [])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className="hidden md:grid grid-cols-[20vw_1fr] rounded-lg bg-[#FFFFFF] h-64 mt-8 mb-8 shadow hover:shadow-lg">
                    <img src={courseData.thumbnail ? `${import.meta.env.VITE_PB_URL}/api/files/1dhkvkt2hpbjlid/${courseData.id}/${courseData.thumbnail}` : GirlStudying} className='w-full h-full rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                    <div className='flex flex-col max-h-64'>
                        <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-4 overflow-hidden whitespace-pre-line">{courseData.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-3 font-bold overflow-hidden whitespace-pre-line">Instructor: {courseData.expand.instructor.name}</p>
                        <div className="flex flex-row max-w-full font-['Montserrat'] text-sm md:text-[1rem] font-bold whitespace-pre-line flex-wrap gap-1 px-8 py-3">
                            {
                                (courseData.expand.tag) &&
                                (courseData.expand.tag.map((data: any, index: number) => {
                                    return <Tag key={index} name={data.name} bgColor="#daeffe" textColor="#0c5a93" />
                                }))
                            }
                        </div>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-auto whitespace-pre-line">{courseData.description}</p>
                        <div className="flex flex-col px-8 py-2">
                            {
                                ((pb.authStore.model!.role).includes('student')) ?
                                    (!courseData.student.includes(pb.authStore.model!.id) ?
                                        <>
                                            {courseData.price == 0 ? <button className="bg-[#639B6D] hover:bg-[#74bf81] w-32 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline" onClick={enrolling}>Enroll</button>
                                                :
                                                <form action={link} method='POST'>
                                                    <button
                                                        className="bg-[#639B6D] hover:bg-[#74bf81] w-32 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
                                                        type='submit'
                                                    >
                                                        Purchase {courseData.price}
                                                    </button>
                                                </form>}


                                        </> :
                                        <button className="bg-[#585858] w-32 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline disabled">Enrolled</button>) :
                                    ""
                            }
                            {
                                ((pb.authStore.model!.role).includes('instructor')) &&
                                <button className="bg-[#5996A5] hover:bg-blue-700 w-32 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline" onClick={() => { navigate('edit') }}>Edit</button>
                            }
                        </div>
                    </div>
                </div>
                <div className="max-h-[50rem] md:hidden grid grid-rows-[h-64_1fr] rounded-lg bg-[#FFFFFF] h-fit shadow hover:shadow-lg m-8">
                    <img src={courseData.thumbnail ? `${import.meta.env.VITE_PB_URL}/api/files/1dhkvkt2hpbjlid/${courseData.id}/${courseData.thumbnail}` : GirlStudying} className='w-full h-full object-fill rounded-t-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                    <div className='flex flex-col m-4'>
                        <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-0 overflow-hidden whitespace-pre-line">{courseData.name}</p>
                        <p className="font-['Montserrat'] text-[1rem] px-8 py-3 font-bold overflow-hidden whitespace-pre-line">Instructor: {courseData.expand.instructor.name}</p>
                        <div className="flex flex-row max-w-full font-['Montserrat'] text-sm md:text-[1rem] font-bold whitespace-pre-line flex-wrap gap-1 px-8 py-3">
                            {
                                (courseData.expand.tag) &&
                                (courseData.expand.tag.map((data: any, index: number) => {
                                    return <Tag key={index} name={data.name} bgColor="#daeffe" textColor="#0c5a93" />
                                }))
                            }

                        </div>
                        <div className="overflow-auto max-h-[14rem]">
                            <p className="font-['Montserrat'] text-[1rem] px-8 py-2 whitespace-pre-line">{courseData.description}</p>
                        </div>

                        <div className="flex flex-col px-8 py-2 items-center gap-1">
                            {
                                ((pb.authStore.model!.role).includes('student')) ?
                                    (!courseData.student.includes(pb.authStore.model!.id) ?
                                        <>
                                            {courseData.price == 0 ? <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline">Enroll</button>
                                                :
                                                <form action={link} method='POST'>
                                                    <button
                                                        className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
                                                        type='submit'
                                                    >
                                                        Purchase {courseData.price}
                                                    </button>
                                                </form>}


                                        </> :
                                        <button className="bg-[#585858] w-40 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline disabled">Enrolled</button>) :
                                    ""
                            }
                            {
                                ((pb.authStore.model!.role).includes('instructor')) &&
                                <button className="bg-[#5996A5] hover:bg-blue-700 w-40 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline">Edit</button>
                            }
                        </div>
                    </div>
                </div>
                {pb.authStore.model!.role.includes('instructor') ? <StudentList data={courseData} /> : ""}
                {pb.authStore.model!.role.includes('instructor') || courseData.student.includes(pb.authStore.model!.id) ? <Announcement data={courseData} /> : ""}
                {pb.authStore.model!.role.includes('instructor') || courseData.student.includes(pb.authStore.model!.id) ? <Material data={courseData} /> : ""}
                {pb.authStore.model!.role.includes('instructor') || courseData.student.includes(pb.authStore.model!.id) ? <Video data={courseData} /> : ""}
                {pb.authStore.model!.role.includes('instructor') || courseData.student.includes(pb.authStore.model!.id) ? <Assignment data={courseData} /> : ""}
            </div>

        </div>

    )

}

export default Course