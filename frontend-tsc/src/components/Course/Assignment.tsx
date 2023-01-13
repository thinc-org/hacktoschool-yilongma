import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import moment from 'moment'
import Swal from 'sweetalert2';
import AssignmentAdder from './Adder/AssignmentAdder';

const pb = new PocketBase('https://pb.jjus.dev');

const Assignment = ({ data }:{data:any;}) => {

    let navigate = useNavigate();

    let trData = null
    if (data.expand.assignment) {
        trData = data.expand.assignment.sort(function compareFn(a:any, b:any) {return (new Date(b.created).valueOf() - new Date(a.created).valueOf())}).map((assignmentData : any, index: number) => {
            return (
                <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]" >
                    <td className="px-4 py-2" onClick={() => {navigate(`/courses/${data.id}/assignments/${assignmentData.id}`)}}>{assignmentData.name}</td>
                    <td className="px-4 py-2" onClick={() => {navigate(`/courses/${data.id}/assignments/${assignmentData.id}`)}}>{(moment(assignmentData.created)).fromNow()}</td>
                    {pb.authStore.model!.role.includes('instructor') && 
                    <td className="px-4 py-2">
                        <div className="flex items-center justify-center gap-x-2">
                            <button className="bg-[#A95151] hover:bg-red-700 text-[0.8rem] text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => {
                                Swal.fire({
                                  title: 'Do you want to delete this assignment?',
                                  showDenyButton: true,
                                  confirmButtonText: 'Delete',
                                }).then(async (result) => {
                                  /* Read more about isConfirmed, isDenied below */
                                  if (result.isConfirmed) {
                                    await pb.collection('assignments').delete(assignmentData.id)
                                    .then(() => Swal.fire({
                                      
                                        icon: 'success',
                                        title: 'This assignment is deleted!',
                                        showConfirmButton: false,
                                        timer: 1500
                                      }).then(() => {window.location.reload()}))
                                  }
                                })}}>
                                Delete
                            </button>
                            <button className="bg-[#5996A5] hover:bg-blue-700 text-[0.8rem] text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigate('/courses/'+data.id+'/assignments/'+assignmentData.id+'/edit')}}>
                                Edit
                            </button>
                        </div>
                    </td>
                        
                    }
                </tr>
            )
        });
    }


    return (
        <>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Course Assignments</label>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-hidden whitespace-pre-line">Total: {data.expand.assignment? data.expand.assignment.length : 0} assignment(s)</label>
                {
                    pb.authStore.model!.role.includes('instructor') && <AssignmentAdder data={data}/>
                }
                <div className="flex flex-col px-8 py-4 max-h-[20rem] overflow-auto">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className={pb.authStore.model!.role.includes('instructor') ? "w-[60%] px-4 py-2" : "w-[70%] px-4 py-2"}>Name</th>
                                <th className={pb.authStore.model!.role.includes('instructor') ? "w-[20%] px-4 py-2" : "w-[30%] px-4 py-2"}>Date</th>
                                {pb.authStore.model!.role.includes('instructor') && <th className="w-[20%] px-4 py-2">Operation</th>}
                            </tr>
                        </thead>
                        <tbody>
                            { trData }
                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}

export default Assignment