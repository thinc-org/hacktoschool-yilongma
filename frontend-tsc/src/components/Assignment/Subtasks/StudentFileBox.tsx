import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);



function StudentFileBox ({ id, index }: {id:any; index:number}) {


    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);

    const [taskData, setTaskData] = useState<any>({});

    const getData = async () => {
        await pb.collection('subtasks').getOne(id || "", {})
        .then((record) => {
            setTaskData(record)
        });
        
    }


    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getData();
    },[])


    function setFile(arg0: File) {
        throw new Error('Function not implemented.');
    }

    return (
        <div>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                <div className="px-8 pt-6 pb-6 mb-4 w-full">
                    <div className="flex flex-row mb-6 items-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            {taskData.name}
                        </label>
                    </div>

                    <div className="mb-6">
                        <ReactQuill theme="snow" value={taskData.description} />
                    </div>

                    <div className="mb-6">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" placeholder="Material" onChange={(e) => {
                                                                                                                                                                                                                if (e.target.files){
                                                                                                                                                                                                                    setFile(e.target.files[0])
                                                                                                                                                                                                                }
                                                                                                                                                                                                                }}/>

                    </div>
                    
                </div>
            </div>
        </div>
    )



}

export default StudentFileBox