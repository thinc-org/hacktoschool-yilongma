import React from 'react'
import { Link } from 'react-router-dom';

function MobileNav() {
    return (
        <div className="z-[10000] fixed h-screen w-screen flex items-center justify-center flex-col m-0 p-0 font-['Montserrat'] font-semibold text-[1.1rem] leading-[100%] gap-y-8 bg-white">
                <a href="/" className="text-[#2B788B] hover:text-[#333333] p-2 -m-2">
                    Main
                </a>

            <a href="/courses" className="text-[#757575] hover:text-[#333333] p-2 -m-2">
                Courses
            </a>
            <a href="#" className="text-[#757575] hover:text-[#333333] p-2 -m-2">
                Statistics
            </a>
            <a href="#" className="text-[#757575] hover:text-[#333333] p-2 -m-2">
                Sprint
            </a>
            <a href="#" className="text-[#757575] hover:text-[#333333] p-2 -m-2">
                Audio-Call
            </a>
        </div>
    )
}

export default MobileNav