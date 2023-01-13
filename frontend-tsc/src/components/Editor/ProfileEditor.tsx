import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const pb = new PocketBase('https://pb.jjus.dev');

const ProfileEditor = () => {
    let { id, userId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();
    

    if (!token) {
        navigate('/')
    }

    
    const [clearAvatar, setClearAvatar] = useState(false)
    const [name, setName] = useState("");
    const [file, setFile] = useState<File>();
    const [resetFileInput, setResetFileInput] = useState(1);



    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // A function that increment 👆🏻 the previous state like here 
        // is better than directly setting `setValue(value + 1)`
    }


    const getData = async () => {
        await pb.collection('users').getOne(userId || "")
        .then((record) => {
            setName(record.name)
        });
        
    }
    
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
            const formData = new FormData();
            if (clearAvatar) {
                formData.append('avatar', "");
            }
            else if (file) {
                formData.append('avatar', file);
            }
            formData.append('name', name);
            await pb.collection('users').update(userId || "", formData)
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
                                Edit Profile
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Profile Picture {!clearAvatar? "(Leave it blank if don't want any change)" : "(Your profile picture will be removed after submitting)"}
                            </label>
                            
                            <input key={resetFileInput} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" placeholder="Profile Picture" onChange={(e) => {
                                                                                                                                                                                                                if (e.target.files){
                                                                                                                                                                                                                    setClearAvatar(false);
                                                                                                                                                                                                                    setFile(e.target.files[0]);
                                                                                                                                                                                                                }
                                                                                                                                                                                                                }}/>
                            {
                                !clearAvatar &&
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={(e) => {setClearAvatar(true); setResetFileInput((prev) => (1-prev))}}>
                                    Remove Profile Picture
                                </button>
                            }
                            
                        </div>


                        <div className="flex flex-row items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )

    
}


export default ProfileEditor