import React, { useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Popover, Transition } from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'
import MobileNav from './MobileNav';

import { RemoveScroll } from 'react-remove-scroll';
import User from './User'

import PocketBase from 'pocketbase'
const pb = new PocketBase(import.meta.env.VITE_PB_URL);
function Header() {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }
    const [open, setOpen] = useState(false)
    const handleNavMenu = () => {
        setOpen(!open)
        console.log(open)
    }

    return (
        <div>
            <header className='flex items-center justify-between h-10 md:h-16 max-w-screen p-6 px-[5vw] lg:px-[12vw] xl:px-[16vw] border-b-2 border-x-[100%]'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-row gap-4 items-center'>
                        <div id='company' className="font-['DelaGothicOne'] md:text-[1.5rem] font-normal text-sm hidden md:block">GlobalTalk</div>
                        <div id='divider' className='w-[1px] h-[1rem] bg-[#E0E0E0] hidden md:block'></div>
                        <div id='buttons' className='flex flex-row'>
                            <Popover>
                                <div className="-my-2 -mr-2 md:hidden">
                                    <button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-900 hover:bg-gray-100 outline-none focus:ring-1" onClick={handleNavMenu}>
                                        <span className="sr-only">Open menu</span>
                                        {!open ? <BiMenuAltLeft className="h-6 w-6" aria-hidden="true" /> : <XMarkIcon className="h-6 w-6" aria-hidden="true" />}
                                    </button>

                                </div>

                                <Popover.Group as="nav" className="hidden space-x-6 lg:space-x-10 md:flex">
                                    <a href="/" className="text-base font-medium text-[#000]">
                                        Home
                                    </a>
                                    <a href="/courses" className="text-base font-medium hover:text-[#333333] text-[#757575]">
                                        Courses
                                    </a>
                                    <a href="/notifications" className="flex flex-row text-base font-medium hover:text-[#333333] text-[#757575] gap-1">
                                        Notifications {(pb.authStore.model! && pb.authStore.model!.notification.length - pb.authStore.model!.notification_seen > 0) && <div className='bg-[#f3d6fd] px-2 rounded-full'>
                                                        <span className={'text-[#681a83] text-[0.8rem]'}>{pb.authStore.model!.notification.length - pb.authStore.model!.notification_seen}</span>
                                                        </div>}
                                    </a>
                                    {/*
                                    <Popover className="relative">
                                        {({ open }) => (
                                            <>
                                                <Popover.Button
                                                    className={classNames(
                                                        open ? 'text-[#333333]' : "text-[#757575]",
                                                        'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-[#333333] focus:outline-none'
                                                    )}
                                                >
                                                    <span>Games</span>
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
                                                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-xs transform px-2 sm:px-0 lg:ml-0">
                                                        <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black ring-opacity-5">
                                                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                                {games.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className="-m-3 flex items-center rounded-lg p-2 text-[#757575] hover:text-[#333333]"
                                                                    >
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-[#757575] hover:text-[#333333]">{item.name}</p>
                                                                        </div>
                                                                        <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                    */}
                                </Popover.Group>
                            </Popover>

                        </div>
                    </div>
                    <div id='company' className="absolute left-[50%] -translate-x-[50%] font-['DelaGothicOne'] font-normal text-center text-xl md:hidden">GlobalTalk</div>
                    <User/>
                </div>
            </header>
            <div className='h-full relative'>
                {open ? <RemoveScroll><MobileNav /></RemoveScroll> : null}
            </div>
        </div>
    )
}

export default Header
