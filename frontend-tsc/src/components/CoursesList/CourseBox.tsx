import React from 'react'
import { useNavigate } from 'react-router-dom';

const CourseBox = ({ id, name, instructor }) => {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/courses/${id}`; 
        navigate(path);
    }




    return (
        <div className='flex flex-row rounded-lg bg-[#FFFFFF] h-64 mt-8 mb-8 shadow hover:shadow-lg'>
            <img src="https://picsum.photos/200/300" className='h-64 w-64 rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
            <div className='flex flex-col'>
                <p className="font-['DelaGothicOne'] text-[1.2rem] px-8 py-4 overflow-hidden whitespace-pre-line">{name}</p>
                <p className="font-['Montserrat'] text-[1rem] px-8 py-2 font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                
                <div className="flex flex-col px-8 py-2">
                    <button className="bg-[#639B6D] hover:bg-[#74bf81] w-40 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" onClick={routeChange}>Description</button>
                </div>
                
            </div>
        </div>
    )
}


export default CourseBox