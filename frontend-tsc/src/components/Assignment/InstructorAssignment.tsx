import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const pb = new PocketBase('https://pb.jjus.dev');


const InstructorAssignment = () => {
    let { id, assignmentId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");



    const getData = async () => {
        console.log(assignmentId)
        await pb.collection('assignments').getOne(assignmentId || "")
        .then((record) => {
            setName(record.name)
            setDescription(record.description || "")
        });
        
    }



    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getData();
    },[])



    return (
        <>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF]  mt-8 mb-8 shadow hover:shadow-lg'>
                <div className="px-8 pt-6 pb-6 mb-4 w-full">
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
                        
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}

export default InstructorAssignment