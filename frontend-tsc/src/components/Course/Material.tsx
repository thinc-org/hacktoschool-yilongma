import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import MaterialAdder from './Adder/MaterialAdder';
import moment from 'moment'
import Swal from 'sweetalert2';

const pb = new PocketBase('https://pb.jjus.dev');

const Material = ({data}:{data:any;}) => {

    let navigate = useNavigate();

    let trData = null
    if (data.expand.material) {
        trData = data.expand.material.sort(function compareFn(a:any, b:any) {return (new Date(b.created).valueOf() - new Date(a.created).valueOf())}).map((materialData : any, index: number) => {
            return (
                <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]">
                    <td className="px-4 py-2" onClick={async () => {const url = pb.getFileUrl(await pb.collection('materials').getOne(materialData.id), materialData.file); window.location.href = url;}}>{materialData.name}</td>
                    <td className="px-4 py-2" onClick={async () => {const url = pb.getFileUrl(await pb.collection('materials').getOne(materialData.id), materialData.file); window.location.href = url;}}>{(moment(materialData.created)).fromNow()}</td>
                    {pb.authStore.model!.role.includes('instructor') && 
                    <td className="px-4 py-2">
                        <div className="flex items-center justify-center gap-x-2">
                            <button className="bg-[#A95151] hover:bg-red-700 text-[0.8rem] text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => {
                                Swal.fire({
                                  title: 'Do you want to delete this material?',
                                  showDenyButton: true,
                                  confirmButtonText: 'Delete',
                                }).then(async (result) => {
                                  /* Read more about isConfirmed, isDenied below */
                                  if (result.isConfirmed) {
                                    await pb.collection('materials').delete(materialData.id)
                                    .then(() => Swal.fire({
                                      
                                        icon: 'success',
                                        title: 'This material is deleted!',
                                        showConfirmButton: false,
                                        timer: 1500
                                      }).then(() => {window.location.reload()}))
                                  }
                                })}}>
                                Delete
                            </button>
                            <button className="bg-[#5996A5] hover:bg-blue-700 text-[0.8rem] text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigate('/courses/'+data.id+'/materials/'+materialData.id+'/edit')}}>
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
                <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Course Materials</label>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-hidden whitespace-pre-line">Total: {data.expand.material? data.expand.material.length : 0} material(s)</label>
                {pb.authStore.model!.role.includes('instructor') && <MaterialAdder data={data}/>}
                <div className="flex flex-col px-8 py-4 max-h-[20rem] overflow-auto">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className={pb.authStore.model!.role.includes('instructor') ? "w-[60%] px-4 py-2" : "w-[70%] px-4 py-2"}>Name</th>
                                <th className={pb.authStore.model!.role.includes('instructor') ? "w-[20%] px-4 py-2" : "w-[30%] px-4 py-2"}>Date</th>
                                {pb.authStore.model!.role.includes('instructor') && <th className="w-[20%] px-4 py-2">Operation</th>}
                            </tr>
                        </thead>
                        <tbody>{trData}</tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}

export default Material