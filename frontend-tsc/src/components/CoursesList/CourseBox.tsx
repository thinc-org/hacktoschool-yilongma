import React from 'react'

const CourseBox = ({ id, name, instructor }) => {
    return (
        <div className='flex flex-row rounded-lg bg-[#FFFFFF] h-64 mt-8 mb-8 shadow hover:shadow-lg'>
            <img src="https://picsum.photos/200/300" className='h-64 w-64 rounded-l-lg' />
            <div className='flex flex-col'>
                <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-4 overflow-hidden whitespace-pre-line">{name}</p>
                <p className="font-['Montserrat'] text-[1rem] px-8 py-2 font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                
                <div className="flex flex-col px-8 py-2">
                    <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">Enroll</button>
                </div>
                
            </div>
        </div>
    )
}


export default CourseBox