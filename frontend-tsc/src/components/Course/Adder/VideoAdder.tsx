import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { BsPlusSquareDotted } from 'react-icons/bs'

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const VideoAdder = ({ data }: { data: any; }) => {

    const navigate = useNavigate();

    const [show, toggleShow] = useState(false);

    const [name, setName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [file, setFile] = useState<File>();

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

    const [uploading, setUploading] = useState<Boolean>(false);

    const handleSubmit = async () => {

        if (!name || (!acceptedFiles && !linkUrl)) {
            Swal.fire({
                title: 'Error',
                text: 'Some fields are empty!',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
            console.log('error')
        }
        else {
            const formData = new FormData();

            if (linkUrl) {
                formData.append('video_link', linkUrl);
            }
            else if (acceptedFiles) {
                formData.append('video_file', acceptedFiles[0]);
            }

            formData.append('name', name);
            await pb.collection('videos').create(formData)
                .then(async (record) => {

                    const oldCourseRecord = await pb.collection('courses').getOne(data.id || "", {
                        expand: '',
                    });

                    var newVideoArray = oldCourseRecord.video || []
                    newVideoArray.push(record.id)

                    var sendData = {
                        "video": newVideoArray
                    };
                    await pb.collection('courses').update(oldCourseRecord.id || "", sendData)
                        .then(async () => {
                            await Swal.fire({
                                title: "Success",
                                text: 'Create new video successfully!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1000

                            }).then(() => {
                                window.location.reload()
                            })
                        }).catch(() => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Please try again later',
                                icon: 'error',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        })
                })

        }
    }

    const files = acceptedFiles.map((file) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));


    return (
        <div className="px-8 py-3">
            {
                (!show) ?
                    <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold mb-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => toggleShow(!show)}>
                        Create
                    </button>
                    :
                    <div className='flex flex-row rounded-lg bg-[#FFFFFF] mb-8 shadow hover:shadow-lg'>
                        <div className="px-8 pt-6 pb-6 mb-4 w-full">
                            <div className="flex flex-row mb-6 items-center">
                                <label className="block text-gray-700 text-lg font-bold mb-2">
                                    Create New Video
                                </label>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Video Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Video Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Select one of these (In case filling both field, video link will be used)
                                </label>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Video Link
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Video Link" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />

                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Video File
                                </label>
                                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" placeholder="Video File"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFile(e.target.files[0])
                                        }
                                    }} /> */}
                                <div {...getRootProps({ className: 'shadow appearance-none border rounded w-full flex items-center justify-center py-10 px-3 text-gray-700 focus:outline-none focus:shadow-outline' })}>
                                    <input {...getInputProps()} />
                                    <BsPlusSquareDotted className='text-3xl' />
                                </div>
                                <aside className='mt-2'>
                                    <ul>{files}</ul>
                                </aside>

                            </div>


                            <div className="flex flex-row items-center justify-between">
                                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => toggleShow(!show)}>
                                    Hide
                                </button>
                                <button className="bg-[#5996A5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={() => {
                                        handleSubmit();
                                        if (name || (acceptedFiles && linkUrl)) {
                                        Swal.fire({
                                            title: 'Uploading',
                                            icon: 'warning',
                                            allowOutsideClick: false,
                                            showConfirmButton: false,
                                        })
                                    }
                                    }}>
                                Create
                            </button>
                        </div>
                    </div>
                    </div>
            }
        </div >

    )

}

export default VideoAdder