import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('https://pb.jjus.dev');

const AssignmentAdder = ({ data }:{data:any;}) => {

    const navigate = useNavigate();

    const handleSubmit = async () => {
            const createdData = {
                "name": "New Assignment",
                "public": false,

            };
            await pb.collection('assignments').create(createdData)
                .then((record) => navigate('assignments/'+record.id))
            
        
    }


    return (
        <div className="px-8 py-3">
            
                
            <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold mb-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                Create
            </button>
                
        </div>
        
    )

}

export default AssignmentAdder