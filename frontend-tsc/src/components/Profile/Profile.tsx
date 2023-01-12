import React, { useState, useEffect, useRef } from 'react'
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.jjus.dev');

const Profile = () => {

    return (
        <div className='max-w-screen min-h-screen bg-[#F6F5F4] flex flex-col items-center md:items-start'>
            <div className='min-w-full flex flex-col md:p-12 md:px-24 lg:p-12 lg:px-48  xl:p-12 xl:px-48'>
                
                <div className="flex flex-col md:flex-row md:grid grid-cols-[20vw_1fr] rounded-lg bg-[#FFFFFF] mt-8 mb-8 px-3 py-4 shadow hover:shadow-lg">
                    <div className="flex flex-col items-center justify-center gap-2 p-2 -m-2">
                        <div className="relative inline-flex basis-32 items-center justify-center min-w-32 min-h-32 w-32 h-32 md:w-32 md:h-32 overflow-hidden bg-[#C3DCE3] rounded-full">
                            
                                            {
                                                (!pb.authStore.model!.avatar) ? 
                                                <span className="font-medium text-[#2B788B] font-[Montserrat]">{pb.authStore.model!.name[0]}</span>
                                                :
                                                <img src={`https://pb.jjus.dev/api/files/_pb_users_auth_/${pb.authStore.model!.id}/${pb.authStore.model!.avatar}`}></img>
                                            }
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className='font-[Montserrat] text-[1.2rem]'>{pb.authStore.model!.name}</p>
                            <p className='font-[Montserrat] text-[1rem]'>[{pb.authStore.model!.role[0]}]</p>
                        </div>
                        
                    </div>
                    
                </div>

            </div>
        </div>
    )

}

export default Profile