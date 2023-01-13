import React, { useEffect, useState, useRef } from 'react'
import PocketBase from 'pocketbase'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const pb = new PocketBase('https://pb.jjus.dev');

const Notification = () => {
    let { userId } = useParams();
    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();

    if (!token) {
        navigate('/')
    }
    

    const [notifications, setNotifications] = useState<any>([])

    const getData = async () => {
        await pb.collection('users').getOne(pb.authStore.model!.id, {
            expand: 'notification',
        }).then((record) => {
            setNotifications(record.expand.notification)
        })
    }


    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        getData();
    },[])

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                
                <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                    <label className="font-['Montserrat'] text-[1.2rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Notifications</label>
                    <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Total: {notifications? notifications.length : 0} notification(s)</label>

                    <div className="flex flex-col px-8 py-4 max-h-[60rem] overflow-auto text-[1rem]">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-[70%] px-4 py-2">Notifications</th>
                                <th className="w-[30%] px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notifications &&
                                notifications.map((data: any, index: number) => {
                                    return (
                                        <tr key={index} className="cursor-pointer hover:bg-[#F6F5F4]">
                                            <td className="px-4 py-2">{data.description}</td>
                                            <td className="px-4 py-2">{data.created}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>


                </div>
                
                    
            </div>
            
        </div>
        
    )

    
}


export default Notification