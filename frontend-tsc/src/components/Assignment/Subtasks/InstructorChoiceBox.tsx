import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);



function InstructorChoiceBox ({ id, index }: {id:any; index:number}) {


    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [choices, setChoices] = useState<any>([])
    const [score, setScore] = useState(0);

    const getData = async () => {
        await pb.collection('subtasks').getOne(id || "", {})
        .then((record) => {
            setName(record.name)
            setDescription(record.description || "")
            setChoices(record.choice || [])
            setScore(record.score || 0)
        });
        
    }

    const handleSubmit = async () => {
        if (score < 0) {
            Swal.fire({
                title:'Error', 
                text:'Maximum score must not be negative!', 
                icon:'error',
                showConfirmButton: false,
                timer: 2000});
            return;
        }
        
        const formData = {
            "name": name,
            "description": description,
            "choice": choices,
            "score" : score,
        }
        await pb.collection('subtasks').update(id || "", formData)
            .then(async () => {
                await Swal.fire({
                    title: "Success",
                    text: 'Edit successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
            
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


    const handleDelete = async () => {
        await pb.collection('subtasks').delete(id || "")
        .then(async () => {
            await Swal.fire({
                title: "Success",
                text: 'Delete successfully!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
        
            }).then(() => {window.location.reload()})
        }).catch(() => {
        Swal.fire({
            title:'Error', 
            text:'Please try again later', 
            icon:'error',
            showConfirmButton: false,
            timer: 2000})
        })
    }

    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getData();
    },[])


    return (
        <div>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                <div className="px-8 pt-6 pb-6 mb-4 w-full">
                    <div className="flex flex-row mb-6 items-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Task {index+1} [Type: Multiple Choices]
                        </label>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Task Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                        
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Total: {choices? choices.length : 0} choice(s)
                        </label>
                        {
                            choices.map((data:any, index:number) => {
                                return (
                                    <div key={index} className="flex flex-row">
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Task Name" value={choices[index]} onChange={(e) => {let temp = [...choices]; temp[index] = e.target.value; setChoices(temp)}}/>
                                        <button className="bg-[#A95151] hover:bg-red-700 text-[0.8rem] text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline" onClick={() => {let temp = [...choices]; temp.splice(index, 1); setChoices(temp)}}>X</button>
                                    </div>
                                )
                            })
                        }
                        <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {setChoices([...choices, "New Choice"])}}>
                            Add new choice
                        </button>
                        
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Maximum Score
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Task Name" value={score.toString()} onChange={(e) => setScore(parseInt(e.target.value) || 0)}/>
                    </div>

                    <div className="flex flex-row items-center justify-between">
                            
                        <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                            Confirm
                        </button>
                        <button className="bg-[#A95151] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )



}

export default InstructorChoiceBox