import React from 'react'
import { BsLightningFill } from 'react-icons/bs'
import { RiRemoteControl2Fill } from 'react-icons/ri'
import JoyStick from '../../assets/images/image6.png'
import Plant from '../../assets/images/image 12.png'
import Boy from '../../assets/images/casual-life-3d-boy-sitting-at-the-desk-with-open-book 9.png'
import Girl from '../../assets/images/image 8.png'
import Shoes from '../../assets/images/image 10.svg'
import Megaphone from '../../assets/images/image 11.svg'

import {
  ArrowSmallRightIcon
} from '@heroicons/react/24/outline'

function Home() {
  return (
    <div className='max-w-screen h-full'>
      <div id='1' className='flex flex-col md:flex-row gap-16 bg-[#F6F5F4] md:p-12 md:px-24 lg:p-20 lg:px-48  xl:p-32 xl:px-72'>
        {/* Left Side */}
        <div className='w-full p-8 flex flex-col items-center md:items-start'>
          <div className='w-[90%] md:w-[80%]'>
            <p className='text-[#2B788B] font-[Montserrat] font-bold text-sm md:text-[1vw] text-center md:text-start'>E-COURSE PLATFORM</p>
            <h1 className='font-[DelaGothicOne] text-black font-normal text-center text-3xl md:text-[2.5vw] mt-6 md:text-start leading-tight'>Learning and teaching online, made easy.</h1>
          </div>
          <div className='w-[100%] md:w-[60%] mt-8'>
            <h2 className='font-[Montserrat] font-semibold text-[#757575] text-sm md:text-start text-center md:text-[0.9vw] hidden md:block'>Practice your English and learn new things with the platform.</h2>
            <h2 className='font-[Montserrat] font-semibold text-[#757575] text-sm md:text-start text-center md:text-[0.9vw] md:hidden block'>Practice and learn new things with the platform.</h2>
          </div>
          <div>
            <button className='rounded-full bg-[#C3DCE3] px-4 py-3 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-10 leading-tight'>
              About Platform
            </button>
          </div>
          <div className='mt-10 flex items-center justify-center md:justify-start w-full flex-row h-fit gap-4 md:gap-10'>
            <div>
              <div className='font-[DelaGothicOne] flex items-center text-2xl md:text-3xl'>
                <BsLightningFill className='text-[#2B788B]' />
                <span>600</span>
                <span className='text-[#2B788B]'>+</span>
              </div>
              <div className='text-center font-[Montserrat] font-semibold text-xs text-[#585858]'>
                <span>Popular words</span>
              </div>
            </div>
            <div id='divider' className='w-[1px] h-10 bg-[#E0E0E0]'></div>
            <div>
              <div className='font-[DelaGothicOne] flex items-center text-3xl'>
                <RiRemoteControl2Fill className='text-[#2B788B]' />
                <span>2</span>
                <span className='text-[#2B788B]'>+</span>
              </div>
              <div className='text-center font-[Montserrat] font-semibold text-xs text-[#585858]'>
                <span>Mini-Games</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className='w-full relative flex items-center justify-center'>
          <div className='relative left-5 w-[80%] md:left-0 md:w-[100%] aspect-[1.2/1] overflow-hidden'>
            <img className="top-[35%] left-0 w-[30%] hidden absolute md:block" src={JoyStick}></img>
            <img className="absolute bottom-[10%] left-0 w-[80%]" src={Boy}></img>
            <img className="absolute bottom-0 right-0 h-[75%]" src={Plant}></img>
          </div>

        </div>
      </div>
      <div id='2' className='flex flex-col md:flex-row gap-0 md:gap-16 bg-[#FFFFFF] md:p-12 md:px-24 lg:p-20 lg:px-48  xl:p-32 xl:px-72'>
        {/* Left Side */}
        <div className='relative w-full p-0 xl:p-8 flex flex-col items-center justify-center mt-10 md:mt-0'>
          <div>
            <img className="w-full h-full" src={Girl}></img>
          </div>

        </div>
        {/* Right Side */}
        <div className='w-full relative flex flex-col items-center justify-center'>
          <div className='w-[90%] md:w-[80%] mt-0 md:mt-10'>
            <h1 className="font-[DelaGothicOne] text-black font-normal text-center text-3xl md:text-[2vw] mt-0 md:mt-6 md:text-start leading-tight">Learn a language in a playful way</h1>
            <p className='font-[Montserrat] text-[#757575] font-semibold text-sm md:text-[0.8vw] mt-0 md:mt-5 text-center md:text-start'>Make learning words more fun with mini-games</p>
          </div>
          <div className='w-[100%] flex flex-row mt-16 gap-3 justify-center md:justify-start'>
            <button className='relative bg-[#F2D4DC] w-32 aspect-square rounded-xl flex items-end justify-center'>
              <img className="absolute -top-[30%]" src={Shoes} />
              <div className='flex text-md flex-row items-center p-3'>
                <p className='font-[Montserrat] font-semibold text-[#945069]'>Sprint ➜</p>
              </div>
            </button>
            <button className='relative bg-[#C3DCE3] h-32 aspect-[1.5/1] rounded-xl flex items-end justify-center'>
              <img className="absolute -top-[30%] left-[25%]" src={Megaphone} />
              <div className='flex text-md flex-row items-center p-3'>
                <p className='font-[Montserrat] font-semibold text-[#2B788B]'>Audio-Call ➜</p>
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home