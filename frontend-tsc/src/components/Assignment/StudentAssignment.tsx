import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const pb = new PocketBase('https://pb.jjus.dev');

const StudentAssignment = () => {
    let { id, assignmentId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();


    const [assignmentData, setAssignmentData] = useState<any>({});



    const getData = async () => {
        console.log(assignmentId)
        await pb.collection('assignments').getOne(assignmentId || "")
        .then((record:any) => {
            setAssignmentData(record)
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
                        <label className="block text-gray-700 text-xl font-bold mb-2">
                            {assignmentData.name}
                        </label>
                    </div>

                    <div className="mb-6">
                        
                    <ReactQuill
                        value={assignmentData.description}
                        readOnly={true}
                        theme={"bubble"}
                    />
                        
    
                    </div>

                    

                   
                    
                </div>
            </div>
            
        </>
    )
}

export default StudentAssignment