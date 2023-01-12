import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'

const pb = new PocketBase('https://pb.jjus.dev');

const VideoBox = () => {
    let { id, videoId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();

    if (!token) {
        navigate('/')
    }
    

    const [videoData, setVideoData] = useState<any>({
        "id": "",
        "name": "",
        "video_link": "",
    });

    const getVideoData = async () => {
        const record = await pb.collection('videos').getOne(videoId || "", {
            expand: '',
        }).then
        ((record) => {
            if (!record.video_link){
                const repRecord={
                    "id": record.id,
                    "name": record.name,
                    "type": "file",
                    "video_link": `https://pb.jjus.dev/api/files/ignzt0tm5r1vn5b/${record.id}/${record.video_file}`,
                    "created": record.created
                }
                console.log(repRecord)
                setVideoData(repRecord)
            }
            else {
                const repRecord={
                    "id": record.id,
                    "name": record.name,
                    "type": "url",
                    "video_link": record.video_link,
                    "created": record.created
                }
                console.log(repRecord)
                setVideoData(repRecord)
            }}
        )
        
    }


    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getVideoData();
    },[])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className='flex flex-col rounded-lg bg-[#FFFFFF]  mt-8 mb-8 shadow hover:shadow-lg'>
                    <label className="font-['Montserrat'] text-[1.2rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">{videoData.name}</label>
                    <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Created on: {(new Date(videoData.created).toLocaleString())}</label>
                    <div className='flex items-center justify-center '>
                    {
                        (videoData.type === "url") ?
                        <ReactPlayer url={videoData.video_link} controls = {true}/>
                        :
                        <video src={videoData.video_link} controls />
                    }
                    </div>
                </div>
            </div>
        </div>
        
    )

    
}


export default VideoBox