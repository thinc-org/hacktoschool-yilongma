import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import InstructorAssignment from './InstructorAssignment';
import StudentAssignment from './StudentAssignment';

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const AssignmentBox = () => {
    let { id, assignmentId } = useParams();
    const token = pb.authStore.token;
    let navigate = useNavigate();

    if (!token) {
        navigate('/')
    }

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                {
                    pb.authStore.model!.role.includes('instructor') ?
                        <InstructorAssignment />
                    :
                        <StudentAssignment />
                }
            </div>
        </div>
    )

    
}


export default AssignmentBox