import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Announcement = ({ data }:{data:any;}) => {

    let navigate = useNavigate();

    let trData = ""
    if (data.expand.announcement) {
        trData = data.expand.announcement.map((announcementData : any, index: number) => {
            return (
                <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]" onClick={() => {navigate(`/courses/${data.id}/announcements/${announcementData.id}`)}}>
                    <td className="px-4 py-2">{announcementData.name}</td>
                    <td className="px-4 py-2">{announcementData.created}</td>
                </tr>
            )
        });
    }


    return (
        <>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Students List</label>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-hidden whitespace-pre-line">Total: {data.expand.announcement? data.expand.announcement.length : 0} announcement(s)</label>
                <div className="flex flex-col px-8 py-4">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-[60%] px-4 py-2">Name</th>
                                <th className="w-[40%] px-4 py-2">Date</th>
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

export default Announcement