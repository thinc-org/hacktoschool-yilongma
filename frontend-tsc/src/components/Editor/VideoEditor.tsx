import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const VideoEditor = () => {
    let { id, videoId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();
    

    if (!token) {
        navigate('/')
    }

    

    const [name, setName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [file, setFile] = useState<File>();

    const getData = async () => {
        const record = await pb.collection('videos').getOne(videoId || "");
        setName(record.name)
        setLinkUrl(record.video_link)
    }
    
    const handleSubmit = async () => {
        if (!name || (!file && !linkUrl)) {
            Swal.fire({
                title:'Error', 
                text:'Some fields are empty!', 
                icon:'error',
                showConfirmButton: false,
                timer: 2000})
        }
        else {
            const formData = new FormData();
            if (linkUrl) {
                formData.append('video_link', linkUrl);
            }
            else if (file) {
                formData.append('video_file', file);
            }
            
            formData.append('name', name);
            await pb.collection('videos').update(videoId || "", formData)
            .then(async () => {
                await Swal.fire({
                    title: "Success",
                    text: 'Edit successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
            
                }).then(() => {
                    navigate(-1)
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
    }

    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getData();
    },[])

    

    

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                <div className='flex flex-row rounded-lg bg-[#FFFFFF] mb-8 shadow hover:shadow-lg'>
                    <div className="px-8 pt-6 pb-6 mb-4 w-full">
                        <div className="flex flex-row mb-6 items-center">
                            <label className="block text-gray-700 text-lg font-bold mb-2">
                                Edit Course Video
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Video Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Video Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Select one of these (In case filling both field, video link will be used)
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Video Link
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Video Link" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}/>
                            
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Video File (Leave it blank to unchange this field)
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" placeholder="Video File" onChange={(e) => {
                                                                                                                                                                                                                if (e.target.files){
                                                                                                                                                                                                                    setFile(e.target.files[0])
                                                                                                                                                                                                                }
                                                                                                                                                                                                                }}/>
                            
                        </div>


                        <div className="flex flex-row items-center justify-between">
                            
                            <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )

    
}


export default VideoEditor