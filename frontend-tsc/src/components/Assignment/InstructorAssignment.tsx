import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InstructorFileBox from './Subtasks/InstructorFileBox';
import InstructorTextBox from './Subtasks/InstructorTextBox';
import InstructorChoiceBox from './Subtasks/InstructorChoiceBox';

const pb = new PocketBase('https://pb.jjus.dev');


const InstructorAssignment = () => {
    let { id, assignmentId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [subtasks, setSubtasks] = useState<any>([]);

    const [detailReload, setDetailReload] = useState(1);
    const [questionReload, setQuestionReload] = useState(1);


    const handleDetailSubmit = async () => {
        if (!name) {
            Swal.fire({
                title:'Error', 
                text:'Some fields are empty!', 
                icon:'error',
                showConfirmButton: false,
                timer: 2000})
        }
        else {
            const formData = {
                "name": name,
                "description": description,
                
            }
            
            await pb.collection('assignments').update(assignmentId || "", formData)
            .then(async () => {
                await Swal.fire({
                    title: "Success",
                    text: 'Edit successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
            
                }).then(() => {
                    setDetailReload((prev) => (1-prev))
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



    const getData = async () => {
        console.log(assignmentId)
        await pb.collection('assignments').getOne(assignmentId || "", {
            'expand': 'subtask'
        })
        .then((record) => {
            setName(record.name)
            setDescription(record.description || "")
            console.log(record.expand.subtask)
            setSubtasks(record.expand.subtask)
        });
        
    }

    const createNewTask = async (type:string) => {
        await pb.collection('subtasks').create({"type": type})
        .then(async (record) => {
            const old = await pb.collection('assignments').getOne(assignmentId || "", {
                'expand': 'subtask'
            })
            await pb.collection('assignments').update(assignmentId || "", {"subtask": [...old.subtask, record.id]}, {
                "expand": 'subtask',
            }).then((newRecord) => {
                getData();
            })
            
        }).then(async () => {
                await Swal.fire({
                    title: "Success",
                    text: 'Add successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
            
                }).then(() => {
                    setQuestionReload((prev) => (1-prev))
                    
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



    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getData();
    },[])



    return (
        <>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF]  mt-8 mb-8 shadow hover:shadow-lg'>
                <div key={detailReload} className="px-8 pt-6 pb-6 mb-4 w-full">
                    <div className="flex flex-row mb-6 items-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            Assignment Details
                        </label>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Assignment Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description
                        </label>
                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                        
                    </div>

                    <div className="flex flex-row items-center justify-between">
                            
                            <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleDetailSubmit}>
                                Confirm
                            </button>
                        </div>
                    
                </div>
            </div>

            <div key={questionReload}>
                {(subtasks) &&
                subtasks.map((data:any, index:number) => {
                    if (data.type === "file") {
                        return <InstructorFileBox key={index} id={data.id} index={index} />
                    }
                    else if (data.type === "textbox") {
                        return <InstructorTextBox key={index} id={data.id} index={index} />
                    }
                    else {
                        return <InstructorChoiceBox key={index} id={data.id} index={index} />
                    }
                })}
            </div>

            <div className='flex flex-col justity-center items-center rounded-lg bg-[#FFFFFF]  mt-8 mb-8 shadow hover:shadow-lg'>
                <div className="flex flex-row justity-center items-center px-8 pt-6 pb-6 mb-4 w-full gap-2">
                    <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {createNewTask("file")}}>
                        Add File Task
                    </button>
                    <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {createNewTask("choice")}}>
                        Add Multiple Choices Task
                    </button>
                    <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {createNewTask("textbox")}}>
                        Add Textbox Task
                    </button>
                </div>
            </div>
            
        </>
    )
}

export default InstructorAssignment