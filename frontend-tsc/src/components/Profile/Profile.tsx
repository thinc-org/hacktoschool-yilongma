import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import PocketBase from 'pocketbase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import EnrolledCourses from './EnrolledCourses';
import { useNavigate, Navigate } from 'react-router-dom';
import InterestedCourses from './InterestedCourses';


const pb = new PocketBase('https://pb.jjus.dev');

const Profile = () => {

    let { userId } = useParams();
    let navigate = useNavigate();
    const token = pb.authStore.token;

    if (!token) {
        { return <Navigate to='/' /> }
    }
    if (pb.authStore.model!.id !== userId) {
        { return <Navigate to='/' /> }
    }

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                
                <div className="flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg">
                    
                    <div className="flex flex-col md:flex-row">
                        {/* Profile Avatar / Name / Role */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2 md:w-[40%]">
                            <div className="inline-flex basis-24 items-center justify-center min-w-24 min-h-24 w-24 h-24 md:w-24 md:h-24 overflow-hidden bg-[#C3DCE3] rounded-full">
                        
                                        {
                                            (!pb.authStore.model!.avatar) ? 
                                            <span className="font-large text-[#2B788B] font-[Montserrat]">{pb.authStore.model!.name[0]}</span>
                                            :
                                            <img src={`https://pb.jjus.dev/api/files/_pb_users_auth_/${pb.authStore.model!.id}/${pb.authStore.model!.avatar}`}></img>
                                        }
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className='font-[Montserrat] text-[1.2rem]'>{pb.authStore.model!.name}</p>
                                <p className='font-[Montserrat] text-[1rem]'>[{pb.authStore.model!.role[0]}]</p>
                            </div>
                        </div>

                        {/* Profile Detail */}
                        <div className="flex flex-col justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-10 md:px-3 py-2 md:w-[60%]">
                            <p className='font-[Montserrat] text-[0.85rem]'><span className="font-bold">E-mail:</span> {pb.authStore.model!.email}</p>
                            <p className='font-[Montserrat] text-[0.85rem]'><span className="font-bold">Account created on:</span> {(new Date (pb.authStore.model!.created).toLocaleString())}</p>
                        </div>
                    </div>
                    

                    {/* Tab Bar */}
                    <div className="flex flex-col items-center justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2">
                        <Tabs className="min-w-full">
                            <TabList>
                                
                                {pb.authStore.model!.role.includes('student') && <Tab>Enrolled Courses</Tab>}
                                {pb.authStore.model!.role.includes('student') && <Tab>Interested Courses</Tab>}
                            </TabList>

                            
                            
                            {pb.authStore.model!.role.includes('student') && 
                            <TabPanel>
                                <EnrolledCourses />
                            </TabPanel>}

                            {pb.authStore.model!.role.includes('student') && 
                            <TabPanel>
                                <InterestedCourses />
                            </TabPanel>}
                        </Tabs>
                    </div>


                    
                </div>

            </div>
        </div>
    )

}

export default Profile