import React from 'react'

function Footer() {
    return (
        <div className='w-full bg-[#F6F5F4] p-6 md:px-[5vw] lg:px-[10vw] flex flex-col items-center'>
            <div className='w-full'>
                <div className='float-left'>
                    <div className='flex flex-row gap-4 font-[Montserrat] font-semibold text-[#757575] text-[14px]'>
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
            <div className='w-full'>
                <div className='float-left'>
                    <div className='flex flex-row gap-4 font-[Montserrat] font-semibold text-[#757575] text-[14px]'>
                        <button className='p-2 -m-2'>Github</button>
                        <button className='p-2 -m-2'>Facebook</button>
                    </div>
                </div>
                <div className='float-right'>
                    <div className='flex flex-row gap-4 font-[Montserrat] font-semibold text-[#757575] text-[12px]'>
                        <button className='p-2 -m-2'>GlobalTalk</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer