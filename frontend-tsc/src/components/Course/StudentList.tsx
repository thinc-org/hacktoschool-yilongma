import React, { useEffect, useState } from 'react'


const StudentList = ({ data }:{data:any;}) => {

    let trData = ""
    if (data.expand.student) {
        trData = data.expand.student.map((studentData : any) => {
            return (
                <tr className="hover:bg-[#F6F5F4]">
                    <td className="px-4 py-2">{studentData.name}</td>
                    <td className="px-4 py-2">{studentData.email || "<hidden>"}</td>
                </tr>
            )
        });
    }


    return (
        <div>
            <div className='flex flex-col rounded-lg bg-[#FFFFFF] min-h-64 mt-8 mb-8 shadow hover:shadow-lg'>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-5 font-bold overflow-hidden whitespace-pre-line">Students List</label>
                <label className="font-['Montserrat'] text-[1rem] px-8 py-2 overflow-hidden whitespace-pre-line">Total: {data.expand.student? data.expand.student.length : 0} student(s)</label>
                <div className="flex flex-col px-8 py-4">
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th className="w-[50%] px-4 py-2">Name</th>
                                <th className="w-[50%] px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { trData }
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default StudentList