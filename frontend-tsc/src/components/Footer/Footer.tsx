import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
//@ts-ignore
import Pluralize from 'react-pluralize'


const socket = io('http://ws.jjus.dev')

// const WS_URL = 'ws://127.0.0.1:8080';
// const ws = new WebSocket("ws://127.0.0.1:8080");

function Footer() {
    const [online,setOnline] = useState(0)
    useEffect(() => {
        socket.on("broadcast", (data: React.SetStateAction<number>) => {
          setOnline(data);
        });
        
      }, [socket]);
    useEffect(() => {
        socket.emit("connected")
    },[])

    return (
        <div className='w-full bg-[#F6F5F4] p-6 md:px-[5vw] lg:px-[10vw] flex flex-col items-center'>
            <div className='w-full p-2 md:p-0'>
                <div className='float-left'>
                    <div className='flex flex-col md:flex-row gap-4 font-[Montserrat] font-semibold text-[#757575] text-[14px]'>
                        <button className='p-2 -m-2'>Home</button>
                        <button className='p-2 -m-2'>Textbook</button>
                        <button className='p-2 -m-2'>Statistics</button>
                        <button className='p-2 -m-2'>Sprint</button>
                        <button className='p-2 -m-2'>Audio-call</button>
                    </div>
                </div>
                <div className='float-right'>
                    <div className='flex flex-row gap-4 font-[Montserrat] font-semibold text-[#757575] text-[14px]'>
                        <button className='p-2 -m-2'>Instructors</button>
                    </div>
                </div>
            </div>
            <div id='divider' className='w-[calc(100%-2vw)] h-[1px] rounded-full bg-[#E0E0E0] m-2'></div>
            <div className='w-full p-2 md:p-0'>
                <div className='float-left'>
                    <div className='flex flex-row items-center gap-4 font-[Montserrat] font-semibold text-[#757575] text-[14px]'>
                        <svg width="28" height="28" viewBox="0 0 30 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0L7.73829 13.7606L13.5413 3.43912H17.4103L9.6727 17.1801L15.4751 27.5003L21.2791 17.2116L30.9633 0H27.0828L17.4147 17.2028L15.4735 20.6322L13.5401 17.188L21.2795 3.4241L23.2128 0H11.6051L7.7366 6.85923L5.80376 3.43166L7.73709 0H0Z"></path>
                        </svg>
                        <img height='28' width='28' src='https://avatars.githubusercontent.com/u/4323747?s=200&v=4'></img>
                        <a href='https://github.com/thinc-org/hacktoschool-yilongma' className='p-2 -m-2'>Github</a>
                    </div>
                </div>
                <div className='float-right'>
                    <div className='h-[28px] flex flex-row gap-4 items-center font-[Montserrat] font-semibold text-[#757575] text-[14px]'>
                        <a><Pluralize singular={'Person'} plural={'People'} count={online} /> Online</a>
                        <a className='p-2 -m-2'>GlobalTalk</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer