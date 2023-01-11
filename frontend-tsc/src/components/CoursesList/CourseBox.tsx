import React from 'react'
import { useNavigate } from 'react-router-dom';

const CourseBox = ({ id, name, instructor }: { id: string; name: string; instructor: string; }) => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/courses/${id}`;
        navigate(path);
    }




    return (
        <div>
            <div className="hidden md:grid grid-cols-[20vw_1fr] rounded-lg bg-[#FFFFFF] h-fit mt-8 mb-8 shadow hover:shadow-lg">
                <img src="https://picsum.photos/200/300" className='aspect-[3/2] w-full h-full object-fill rounded-l-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                <div className='relative flex flex-col flex-shrink min-w-0 items-center md:items-start px-4 py-8 md:px-8 md:py-4 gap-2 md:gap-6'>
                    <p className="font-['DelaGothicOne'] text-sm md:text-[1.2rem] overflow-hidden whitespace-pre-line">{name}</p>
                    <p className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                    <button className="bg-[#639B6D] hover:bg-[#74bf81] w-[80%] md:w-40 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={routeChange}>Description</button>
                </div>
            </div>
            <div className="md:hidden grid grid-rows-2 rounded-lg bg-[#FFFFFF] h-fit mt-8 mb-8 shadow hover:shadow-lg m-8">
                <img src="https://picsum.photos/300/200" className='aspect-[2/3] w-full h-full rounded-t-lg min-h-64 max-h-64 min-w-64 max-w-64' />
                <div className='relative flex flex-col flex-shrink min-w-0 items-center md:items-start px-4 py-8 md:px-8 md:py-4 gap-2 md:gap-6'>
                    <p className="font-['DelaGothicOne'] text-sm md:text-[1.2rem] overflow-hidden whitespace-pre-line">{name}</p>
                    <p className="font-['Montserrat'] text-sm md:text-[1rem] font-bold overflow-hidden whitespace-pre-line">Instructor: {instructor}</p>
                    <button className="bg-[#639B6D] hover:bg-[#74bf81] w-[80%] md:w-40 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-auto md:mt-0" onClick={routeChange}>Description</button>
                </div>
            </div>
        </div>
    )
}


export default CourseBox