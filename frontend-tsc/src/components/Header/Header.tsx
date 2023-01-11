import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { FaUserCircle } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import Avatar from '@mui/material/Avatar'
import { MenuUnstyled } from '@mui/base';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
    ArrowSmallRightIcon
} from '@heroicons/react/24/outline'

import {
    ArrowPathIcon,
    Bars3Icon,
    BookmarkSquareIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorArrowRaysIcon,
    LifebuoyIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'


const games = [
    {
        name: 'Sprint',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: ArrowSmallRightIcon,
    },
    {
        name: 'Audio-Call',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: ArrowSmallRightIcon,
    },
]

function Header() {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <header className='flex items-center justify-between'>
            <div className='w-screen flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-4 items-center'>
                    <div id='company' className="font-['DelaGothicOne'] md:text-[1.5rem] font-normal text-sm">GlobalTalk</div>
                    <div id='divider' className='w-[1px] h-[1rem] bg-[#E0E0E0]'></div>
                    <div id='buttons' className='flex flex-row gap-3'>
                        <Popover>
                            <div className="-my-2 -mr-2 md:hidden">
                                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                                <a href="#" className="text-base font-medium text-[#000]">
                                    Home
                                </a>
                                <a href="#" className="text-base font-medium hover:text-[#333333] text-[#757575]">
                                    Textbook
                                </a>
                                <a href="#" className="text-base font-medium hover:text-[#333333] text-[#757575]">
                                    Statistics
                                </a>
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
                                                        open ? "text-['#BABABA']" : 'text-gray-400',
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
                                                                    <item.icon className="h-4 w-4 flex-shrink-0 text-" aria-hidden="true" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>

                            <Transition
                                as={Fragment}
                                enter="duration-200 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="px-5 pt-5 pb-6">
                                            <div className="flex items-center justify-between">
                                                <div className="-mr-2">
                                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-900">
                                                        <span className="sr-only">Close menu</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <div className="flex flex-col">
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                        Main
                                                    </a>
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                        Textbook
                                                    </a>
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                        Statistics
                                                    </a>
                                                    {games.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}

                                                        >
                                                            <span className="text-base font-medium text-gray-900">{item.name}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                    </div>
                </div>
                <div className='flex flex-row gap-4 items-center'>
                        <FaUserCircle />
                    <button id='user'>Login</button>


                </div>
            </div>
        </header>
    )
}

export default Header