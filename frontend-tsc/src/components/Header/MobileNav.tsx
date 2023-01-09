import React from 'react'

function MobileNav() {
    return (
            <div className="z-[10000] fixed h-screen w-screen overflow-auto flex items-center justify-center flex-col m-0 p-0 font-['Montserrat'] font-semibold text-[1.1rem] leading-[100%] gap-y-8 bg-white">
                <a href="" className="text-[#2B788B] hover:text-[#333333]">
                    Main
                </a>
                
                <a href="#" className="text-[#757575] hover:text-[#333333]">
                    Textbook
                </a>
                <a href="#" className="text-[#757575] hover:text-[#333333]">
                    Statistics
                </a>
                <a href="#" className="text-[#757575] hover:text-[#333333]">
                    Sprint
                </a>
                <a href="#" className="text-[#757575] hover:text-[#333333]">
                    Audio-Call
                </a>
            </div>
    )
}

export default MobileNav