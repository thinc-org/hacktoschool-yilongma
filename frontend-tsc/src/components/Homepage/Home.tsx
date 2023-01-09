import React from 'react'
import { BsLightningFill } from 'react-icons/bs'
import { RiRemoteControl2Fill } from 'react-icons/ri'
import JoyStick from '../../assets/images/image6.png'
import Plant from '../../assets/images/image 12.png'
import Boy from '../../assets/images/casual-life-3d-boy-sitting-at-the-desk-with-open-book 9.png'

function Home() {
  return (
    <div className='w-screen h-full md:p-12 md:px-24 lg:p-20 lg:px-48  xl:p-32 xl:px-72 bg-[#F6F5F4]'>
      <div id='1' className='flex flex-col md:flex-row gap-16'>
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
            <button className='rounded-full bg-[#C3DCE3] px-3 py-2.5 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-10'>
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
    </div>
  )
}

export default Home