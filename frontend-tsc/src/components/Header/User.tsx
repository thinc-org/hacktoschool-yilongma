import React, { useState, useEffect, useRef, Fragment } from 'react'
import PocketBase from 'pocketbase';
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import { Navigate, useNavigate } from 'react-router-dom';
import LoginPop from '../Auth/LoginPop';


const pb = new PocketBase('https://pb.jjus.dev');

function User() {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const token = pb.authStore.token;
    const dataFetchedRef = useRef(false);
    let navigate = useNavigate();

    const authRefresh = async () => {
        await pb.collection('users').authRefresh();
    }

    useEffect(() => {
        if (dataFetchedRef.current || (token == '')) return;
        dataFetchedRef.current = true;
        authRefresh().catch(handleLogout)
    }, [])

    const handleLogout = () => {
        pb.authStore.clear()
        window.location.href = "/";
    };

    return (
        <div className='flex flex-row gap-1 md:gap-2 items-center'>
            {!token ?
                <>
                    <LoginPop/>
                </>
                :
                <>
                    {/* <button onClick={handleLogout} className="text-[1rem] leading-[22px] font-bold font-[Montserrat] text-[#000] hidden md:block">
                        Logout <span className='text-[0.5rem] text-center align-middle'>➜</span>
                    </button> */}
                    <Popover className="relative">
                        {({ open }) => (
                            <>
                                <Popover.Button
                                    className={classNames(
                                        open ? 'text-[#333333]' : "text-[#757575]",
                                        'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-[#333333] focus:outline-none'
                                    )}
                                >
                                    <div className='flex flex-row items-center gap-2 p-2 -m-2'>
                                        <div className="relative inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 overflow-hidden bg-[#C3DCE3] rounded-full">
                                            {
                                                (!pb.authStore.model!.avatar) ? 
                                                <span className="font-medium text-[#2B788B] font-[Montserrat]">{pb.authStore.model!.name[0]}</span>
                                                :
                                                <img src={`https://pb.jjus.dev/api/files/_pb_users_auth_/${pb.authStore.model!.id}/${pb.authStore.model!.avatar}`}></img>
                                            }
                                            
                                        </div>
                                        <p className='font-[Montserrat] text-[1rem]'>{pb.authStore.model!.name.split(' ')[0]}</p>
                                    </div>
                                    <ChevronDownIcon
                                        className={classNames(
                                            open ? "text-['#BABABA'] rotate-180 transform" : 'text-gray-400',
                                            'ml-2 h-5 w-5 group-hover:text-gray-500'
                                        )}
                                        aria-hidden="true"
                                    />
                                </Popover.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="absolute mt-6">
                                        <div className="overflow-hidden rounded-lg shadow-md w-fit">
                                            <div className="relative grid gap-6 bg-white sm:gap-8 sm:p-6 whitespace-nowrap">
                                                <button
                                                    className="-m-3 flex items-center rounded-lg p-2 text-[#757575] hover:text-[#333333]"
                                                    onClick={() => {if (pb.authStore.model!.id) {navigate('users/'+pb.authStore.model!.id)} else {navigate('/')}}}
                                                >
                                                    <div className="">
                                                        <p className="text-base font-medium text-[#757575] hover:text-[#333333]">Profile</p>
                                                    </div>
                                                </button>
                                                <button
                                                    className="-m-3 flex items-center rounded-lg p-2 text-[#757575] hover:text-[#333333]"
                                                    onClick={handleLogout}
                                                >
                                                    <div className="">
                                                        <p className="text-base font-medium text-[#757575] hover:text-[#333333]">Logout</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                </>}
        </div>
    )
}

export default User