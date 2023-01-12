import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Tag from '../Tags/Tag';
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.jjus.dev');

const CourseBox = ({ id, name, instructor, data, tag }: { id: string; name: string; instructor: string; data: any; tag: any }) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/courses/${id}`;
        navigate(path);
    }

    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setLoading(false);
    },[])
    console.log(data.expand)
    console.log(data.expand)


    return (
        <>
            {loading && (<Skeleton height='10vh' className='mt-2'/>)}
            {!loading &&
                <>
                    <div className="hidden md:grid grid-cols-[20vw_1fr] rounded-lg bg-[#FFFFFF] h-fit mt-8 mb-8 shadow hover:shadow-lg">
                        <img src="https://picsum.photos/200/300" loading='lazy' className='aspect-[3/2] w-full h-full object-fill rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                        <div className='relative flex flex-col flex-shrink min-w-0 items-center md:items-start px-4 py-8 md:px-8 md:py-4 gap-2 md:gap-6'>
                            <p className="font-['DelaGothicOne'] text-sm md:text-[1.2rem] overflow-hidden whitespace-pre-line">{name}</p>
                            <p className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                            <div className="flex flex-row max-w-full font-['Montserrat'] text-sm md:text-[1rem] font-bold whitespace-pre-line gap-1">
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
                            <button className="bg-[#639B6D] hover:bg-[#74bf81] w-[80%] md:w-32 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={routeChange}>View</button>
                        </div>
                    </div><div className="md:hidden grid grid-rows-2 rounded-lg bg-[#FFFFFF] h-fit mt-8 mb-8 shadow hover:shadow-lg m-8">
                        <img src="https://picsum.photos/300/200" className='aspect-[2/3] w-full h-full rounded-t-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                        <div className='relative flex flex-col flex-shrink min-w-0 items-center md:items-start px-4 py-8 md:px-8 md:py-4 gap-2 md:gap-6'>
                            <p className="font-['DelaGothicOne'] text-sm md:text-[1.2rem] overflow-hidden whitespace-pre-line">{name}</p>
                            <p className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                            <div className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">
                            {   
                                pb.authStore.model!.role.includes('student') && 
                                (data.student.includes(pb.authStore.model!.id) ? 
                                <Tag name="Enrolled" bgColor="#d1feb6" textColor="#4b991c" /> 
                                : 
                                <Tag name="Unenrolled" bgColor="#ffe2bf" textColor="#d67f19" />)
                            }
                            </div>
                            <button className="bg-[#639B6D] hover:bg-[#74bf81] w-[80%] md:w-32 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={routeChange}>View</button>
                        </div>
                    </div>
                </>}
        </>
    )
}


export default CourseBox