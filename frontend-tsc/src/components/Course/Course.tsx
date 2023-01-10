import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.jjus.dev');

const Course = () => {
    let { id } = useParams();

    const [courseData, setCourseData] = useState({});

    const getCourseData = async () => {
        const record = await pb.collection('courses').getOne(id, {
            expand: 'relField1,relField2.subRelField',
        });
        console.log(record)
        setCourseData(record)
    }

    useEffect(() => {
        getCourseData();
    }, [])

    return (
        <div className='flex flex-row rounded-lg bg-[#FFFFFF] h-64 mt-8 mb-8 shadow hover:shadow-lg'>
            <img src="https://picsum.photos/200/300" className='h-64 w-64 rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
            <div className='flex flex-col'>
                <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-4 overflow-hidden whitespace-pre-line">{courseData.name}</p>
                <p className="font-['Montserrat'] text-[1rem] px-8 py-2 font-bold overflow-hidden whitespace-pre-line">Instructor: {courseData.instructor}</p>
                
                <div className="flex flex-col px-8 py-2">
                    <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">Description</button>
                </div>
                
            </div>
        </div>
    )

}

export default Course