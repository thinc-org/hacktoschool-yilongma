import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import filterOptions from '../Tags/filterOptions';

const pb = new PocketBase('https://pb.jjus.dev');

const CourseEditor = () => {
    let { id } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();
    const animatedComponents = makeAnimated();
    

    if (!token) {
        navigate('/')
    }

    
    const [clearAvatar, setClearAvatar] = useState(false)
    const [name, setName] = useState("");
    const [descriptionText, setDescriptionText] = useState("");
    const [file, setFile] = useState<File>();
    const [resetFileInput, setResetFileInput] = useState(1);
    const [tagArray, settagArray] = useState<any>([])
    





    const getData = async () => {
        await pb.collection('courses').getOne(id || "")
        .then((record) => {
            setName(record.name)
            setDescriptionText(record.description)
            let tempArray = []
            for (const eachTag of filterOptions) {
                if (record.tag.includes(eachTag.value)) {
                    tempArray.push(eachTag)
                }
            }
            
            settagArray(tempArray)
        });
        
    }
    
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
            let tagTempArray: any[] = [];
            tagArray.map((data:any) => {
                tagTempArray.push(data.value)
            })
            const formData = new FormData();
            if (clearAvatar) {
                formData.append('thumbnail', "");
            }
            else if (file) {
                formData.append('thumbnail', file);
            }
            formData.append('name', name);
            formData.append('description', descriptionText);
            for (const eachTag of tagTempArray){
                formData.append('tag', eachTag);
            }
            await pb.collection('courses').update(id || "", formData)
            .then(async () => {
                await Swal.fire({
                    title: "Success",
                    text: 'Edit successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
            
                }).then(() => {
                    navigate('/courses/'+id)
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
                                Edit Course
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" value={descriptionText} onChange={(e) => setDescriptionText(e.target.value)} />
                            
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Course Picture {!clearAvatar? "(Leave it blank if don't want any change)" : "(Your profile picture will be removed after submitting)"}
                            </label>
                            
                            <input key={resetFileInput} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" placeholder="Material" onChange={(e) => {
                                                                                                                                                                                                                if (e.target.files){
                                                                                                                                                                                                                    setClearAvatar(false);
                                                                                                                                                                                                                    setFile(e.target.files[0]);
                                                                                                                                                                                                                }
                                                                                                                                                                                                                }}/>
                            {
                                !clearAvatar &&
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={(e) => {setClearAvatar(true); setResetFileInput((prev) => (1-prev))}}>
                                    Remove Course Picture
                                </button>
                            }
                            
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Course Category
                            </label>
                            <Select className='z-40' value={tagArray} closeMenuOnSelect={false} isMulti components={animatedComponents} options={filterOptions} placeholder="Select Filters" onChange={(inputValue:any) => {settagArray(inputValue);}} />
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


export default CourseEditor