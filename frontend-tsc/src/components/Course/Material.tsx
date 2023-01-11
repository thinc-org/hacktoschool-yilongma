import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import MaterialAdder from './Adder/MaterialAdder';

const pb = new PocketBase('https://pb.jjus.dev');

const Material = ({data}:{data:any;}) => {

    let navigate = useNavigate();

    let trData = ""
    if (data.expand.material) {
        trData = data.expand.material.sort(function compareFn(a:any, b:any) {return (new Date(b.created).valueOf() - new Date(a.created).valueOf())}).map((materialData : any, index: number) => {
            return (
                <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]" onClick={async () => {const url = pb.getFileUrl(await pb.collection('materials').getOne(materialData.id), materialData.file); window.location.href = url;}}>
                    <td className="px-4 py-2">{materialData.name}</td>
                    <td className="px-4 py-2">{(new Date(materialData.created)).toLocaleString()}</td>
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
                                <th className="w-[70%] px-4 py-2">Name</th>
                                <th className="w-[30%] px-4 py-2">Date</th>
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