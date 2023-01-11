import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const pb = new PocketBase('https://pb.jjus.dev');

const AnnouncementBox = () => {
    let { id, announcementId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();

    if (!token) {
        navigate('/login')
    }
    

    const [announcementData, setAnnouncementData] = useState<any>({
        "id": "",
        "name": "",
        "description": "",
    });

    const getAnnouncementData = async () => {
        const record = await pb.collection('announcements').getOne(announcementId || "", {
            expand: '',
        });
        console.log(record)
        setAnnouncementData(record)
    }


    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getAnnouncementData();
    },[])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                    <label className="font-['Montserrat'] text-[1.2rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">{announcementData.name}</label>
                    <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Created on: {(new Date (announcementData.created).toLocaleString())}</label>
                    <label className="font-['Montserrat'] text-[1rem] px-8 py-4 overflow-hidden whitespace-pre-line">{announcementData.description}</label>
                </div>
            </div>
        </div>
        
    )

    
}


export default AnnouncementBox