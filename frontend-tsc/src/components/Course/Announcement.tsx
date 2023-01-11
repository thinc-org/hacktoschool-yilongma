import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AnnouncementAdder from './Adder/AnnouncementAdder';
import PocketBase from 'pocketbase';
import moment from 'moment'

const pb = new PocketBase('https://pb.jjus.dev');

const Announcement = ({ data }:{data:any;}) => {

    let navigate = useNavigate();

    let trData = ""
    if (data.expand.announcement) {
        trData = data.expand.announcement.sort(function compareFn(a:any, b:any) {return (new Date(b.created).valueOf() - new Date(a.created).valueOf())}).map((announcementData : any, index: number) => {
            return (
                <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]" onClick={() => {navigate(`/courses/${data.id}/announcements/${announcementData.id}`)}}>
                    <td className="px-4 py-2">{announcementData.name}</td>
                    <td className="px-4 py-2">{(moment(announcementData.created)).fromNow()}</td>
                </tr>
            )
        });
    }


    return (
        <>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Course Announcements</label>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-hidden whitespace-pre-line">Total: {data.expand.announcement? data.expand.announcement.length : 0} announcement(s)</label>
                {
                    pb.authStore.model!.role.includes('instructor') && <AnnouncementAdder data={data}/>
                }
                <div className="flex flex-col px-8 py-4 max-h-[20rem] overflow-auto">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-[70%] px-4 py-2">Name</th>
                                <th className="w-[30%] px-4 py-2">Date</th>
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