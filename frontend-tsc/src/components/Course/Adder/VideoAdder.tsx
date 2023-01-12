import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('https://pb.jjus.dev');

const VideoAdder = ({ data }:{data:any;}) => {

    const navigate = useNavigate();

    const [show, toggleShow] = useState(false);

    const [name, setName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");

    const handleSubmit = async () => {
        if (!name) {
            Swal.fire({
                title:'Error', 
                text:'Some fields are empty!', 
                icon:'error',
                showConfirmButton: false,
                timer: 2000})
        }
        else {
            const createdData = {
                "name": name,
                // "description": descriptionText,
            };
            await pb.collection('announcements').create(createdData)
                .then(async (record) => {

                    const oldCourseRecord = await pb.collection('courses').getOne(data.id || "", {
                        expand: '',
                    });

                    var newAnnouncementArray = oldCourseRecord.announcement || []
                    newAnnouncementArray.push(record.id)

                    var sendData = {
                        "id": oldCourseRecord.id,
                        "name": oldCourseRecord.name,
                        "instructor": oldCourseRecord.instructor,
                        "thumbnail" : oldCourseRecord.thumbnail || "",
                        "description": oldCourseRecord.description || "",
                        "announcement": newAnnouncementArray,
                    };
                    const newRecord = await pb.collection('courses').update(oldCourseRecord.id || "", sendData)
                    .then(async () => {
                        await Swal.fire({
                            title: "Success",
                            text: 'Create new announcement successfully!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                    
                        }).then(() => {
                            navigate('/courses/'+data.id+'/announcements/'+record.id)
                        })
                    }).catch(() => {
                    Swal.fire({
                        title:'Error', 
                        text:'Please try again later', 
                        icon:'error',
                        showConfirmButton: false,
                        timer: 2000})
                    })
                })
            
        }
    }


    return (
        <div className="px-8 py-3">
            {
                (!show)?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => toggleShow(!show)}>
                        Create
                </button>
                :
                <div className='flex flex-row rounded-lg bg-[#FFFFFF] mb-8 shadow hover:shadow-lg'>
                    <div className="px-8 pt-6 pb-6 mb-4 w-full">
                        <div className="flex flex-row mb-6 items-center">
                            <label className="block text-gray-700 text-lg font-bold mb-2">
                                Create New Video
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Video Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Announcement Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Select one of these
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Video Link
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Announcement Name" value={name} onChange={(e) => setName(e.target.value)}/>
                            
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Video File
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                            
                        </div>


                        <div className="flex flex-row items-center justify-between">
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => toggleShow(!show)}>
                                Hide
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
        
    )

}

export default VideoAdder