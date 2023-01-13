import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';
import MailSender from '../../NotificationSender/MailSender';
import SlackSender from '../../NotificationSender/SlackSender';
import DiscordSender from '../../NotificationSender/DiscordSender';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const AnnouncementAdder = ({ data }:{data:any;}) => {

    const navigate = useNavigate();

    const [show, toggleShow] = useState(false);

    const [name, setName] = useState("");
    const [descriptionText, setDescriptionText] = useState("");

    const handleSubmit = async () => {
        if (!name || !descriptionText) {
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
                "description": descriptionText,
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
                        const newNotification = await pb.collection('notifications').create({"description": `There is new announcement in the course "${data.name}"`})
                        let tempEmail: any[] = []
                        for (const eachStudentId of data.student)
                        await pb.collection('users').getOne(eachStudentId).then(async (urec) => {
                            await pb.collection('users').update(eachStudentId, {"notification": [...urec.notification, newNotification.id]})
                            tempEmail.push(urec.email)
                        })
                        
                        await Swal.fire({
                            title: "Success",
                            text: 'Create new announcement successfully!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000
                    
                        }).then(async () => {
                            navigate('/courses/'+data.id+'/announcements/'+record.id)
                            await MailSender("New announcement in Hack2School - GlobalTalk", `There is new announcement in the course "${data.name}"\n\nTopic: ${record.name}\n\n${record.description}`, tempEmail)
                            await SlackSender(`There is new announcement in the course "${data.name}"\n\nTopic: ${record.name}\n\n${record.description}`)
                            await DiscordSender(`There is new announcement in the course "${data.name}"\n\nTopic: ${record.name}\n\n${record.description}`)
                            
                        })
                    }).catch((e) => {
                        console.log(e)
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
                <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold mb-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => toggleShow(!show)}>
                        Create
                </button>
                :
                <div className='flex flex-row rounded-lg bg-[#FFFFFF] mb-8 shadow hover:shadow-lg'>
                    <div className="px-8 pt-6 pb-6 mb-4 w-full">
                        <div className="flex flex-row mb-6 items-center">
                            <label className="block text-gray-700 text-lg font-bold mb-2">
                                Create New Announcement
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Announcement Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Announcement Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" value={descriptionText} onChange={(e) => setDescriptionText(e.target.value)} />
                            
                        </div>


                        <div className="flex flex-row items-center justify-between">
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => toggleShow(!show)}>
                                Hide
                            </button>
                            <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
        
    )

}

export default AnnouncementAdder