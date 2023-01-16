import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Tag from '../Tags/Tag';
import PocketBase from 'pocketbase'
import Swal from 'sweetalert2';
import GirlStudying from '../../assets/images/girl-studying.png?webp&imagetools'

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const CourseBox = ({ id, name, instructor, data, tag }: { id: string; name: string; instructor: string; data: any; tag: any }) => {

    let navigate = useNavigate();

    const [isInterested, setInterested] = useState<boolean>(pb.authStore.model!.interested_course.includes(id))

    const routeChange = () => {
        let path = `/courses/${id}`;
        navigate(path);
    }

    const interested = async () => {
        const record = await pb.collection('users').getOne(pb.authStore.model!.id || "");
        var newInterestArray = record.interested_course || []
        newInterestArray.push(id)
        var sendData = {
            "interested_course": newInterestArray
        };
        const newRecord = await pb.collection('users').update(pb.authStore.model!.id || "", sendData)
                    .then(async () => {
                        await Swal.fire({
                            title: "Success",
                            text: 'Add to interested courses!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                    
                        }).then(() => {
                            setInterested((prev) => !prev)
                        })
                    }).catch(() => {
                    Swal.fire({
                        title:'Error', 
                        text:'Please try again later', 
                        icon:'error',
                        showConfirmButton: false,
                        timer: 2000})
                    })
    }

    const uninterested = async () => {
        const record = await pb.collection('users').getOne(pb.authStore.model!.id || "");
        var newInterestArray = record.interested_course || []
        var index = newInterestArray.indexOf(id);
        if (index !== -1) {
            newInterestArray.splice(index, 1);
        }
        var sendData = {
            "interested_course": newInterestArray
        };
        const newRecord = await pb.collection('users').update(pb.authStore.model!.id || "", sendData)
                    .then(async () => {
                        await Swal.fire({
                            title: "Success",
                            text: 'Remove from interested courses!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                    
                        }).then(() => {
                            setInterested((prev) => !prev)
                        })
                    }).catch(() => {
                    Swal.fire({
                        title:'Error', 
                        text:'Please try again later', 
                        icon:'error',
                        showConfirmButton: false,
                        timer: 2000})
                    })
    }

    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setLoading(false);
    },[])


    return (
        <>
            {loading && (<Skeleton height='10vh' className='mt-2'/>)}
            {!loading &&
                <>
                    <div className="hidden md:grid grid-cols-[20vw_1fr] rounded-lg bg-[#FFFFFF] h-fit mt-8 mb-8 shadow hover:shadow-lg">
                        <img src={data.thumbnail ? `${import.meta.env.VITE_PB_URL}/api/files/1dhkvkt2hpbjlid/${data.id}/${data.thumbnail}` : GirlStudying} loading='lazy' className='w-full h-full object-cover rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                        <div className='relative flex flex-col flex-shrink min-w-0 items-center md:items-start px-4 py-8 md:px-8 md:py-4 gap-2 md:gap-6'>
                            <p className="font-['DelaGothicOne'] text-sm md:text-[1.2rem] overflow-hidden whitespace-pre-line">{name}</p>
                            <p className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                            <div className="flex flex-row max-w-full font-['Montserrat'] text-sm md:text-[1rem] font-bold whitespace-pre-line flex-wrap gap-1">
                            {   
                                pb.authStore.model!.role.includes('student') && 
                                (data.student.includes(pb.authStore.model!.id) ? 
                                <Tag name="Enrolled" bgColor="#d1feb6" textColor="#4b991c" />
                                : 
                                <Tag name="Unenrolled" bgColor="#ffe2bf" textColor="#d67f19" />)
                            }
                            {
                                (data.expand.tag) &&
                                (data.expand.tag.map((data: any, index: number) => {
                                    return <Tag key={index} name={data.name} bgColor="#daeffe" textColor="#0c5a93" />
                                }))
                            }
                            
                            </div>
                            <div className="flex flex-row flex-wrap gap-2">
                                <button className="bg-[#639B6D] hover:bg-[#74bf81] w-[80%] md:w-32 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={routeChange}>View</button>
                                {
                                    pb.authStore.model!.role.includes('student') && 
                                    (isInterested?
                                    <button className="bg-[#A15993] hover:bg-[#b072a4] w-[80%] md:w-32 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={uninterested}>Uninterest</button>
                                    :
                                    <button className="bg-[#C4A24C] hover:bg-[#d6bb78] w-[80%] md:w-32 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={interested}>Interest</button>)
                                }
                            </div>
                            
                        </div>
                    </div><div className="md:hidden grid grid-rows-2 rounded-lg bg-[#FFFFFF] h-fit mt-8 mb-8 shadow hover:shadow-lg m-8">
                        <img src={data.thumbnail ? `${import.meta.env.VITE_PB_URL}/api/files/1dhkvkt2hpbjlid/${data.id}/${data.thumbnail}` : GirlStudying} className='object-cover w-full h-full rounded-t-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                        <div className='relative flex flex-col flex-shrink min-w-0 items-center md:items-start px-4 py-8 md:px-8 md:py-4 gap-2 md:gap-6'>
                            <p className="font-['DelaGothicOne'] text-sm md:text-[1.2rem] overflow-hidden whitespace-pre-line">{name}</p>
                            <p className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                            <div className="flex flex-row max-w-full font-['Montserrat'] text-sm md:text-[1rem] font-bold whitespace-pre-line flex-wrap gap-1">
                            {   
                                pb.authStore.model!.role.includes('student') && 
                                (data.student.includes(pb.authStore.model!.id) ? 
                                <Tag name="Enrolled" bgColor="#d1feb6" textColor="#4b991c" />
                                : 
                                <Tag name="Unenrolled" bgColor="#ffe2bf" textColor="#d67f19" />)
                            }
                            {
                                (data.expand.tag) &&
                                (data.expand.tag.map((data: any, index: number) => {
                                    return <Tag key={index} name={data.name} bgColor="#daeffe" textColor="#0c5a93" />
                                }))
                            }
                            </div>
                            <button className="bg-[#639B6D] hover:bg-[#74bf81] w-[80%] md:w-32 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={routeChange}>View</button>
                            {
                                pb.authStore.model!.role.includes('student') && 
                                (isInterested?
                                <button className="bg-[#A15993] hover:bg-[#b072a4] w-[80%] md:w-32 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={uninterested}>Uninterest</button>
                                :
                                <button className="bg-[#C4A24C] hover:bg-[#d6bb78] w-[80%] md:w-32 text-white font-bold py-2 rounded-full focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={interested}>Interest</button>)
                            }
                        </div>
                    </div>
                </>}
        </>
    )
}


export default CourseBox