import React from 'react'
import { BsLightningFill } from 'react-icons/bs'
import { RiRemoteControl2Fill } from 'react-icons/ri'
import JoyStick from '../../assets/images/image6.png'
import Plant from '../../assets/images/image 12.png'
import Boy from '../../assets/images/casual-life-3d-boy-sitting-at-the-desk-with-open-book 9.png'

function Home() {
  return (
    <div className='w-screen h-full p-32 px-72 bg-[#F6F5F4]'>
      <div id='1' className='flex flex-row gap-16'>
        <div className='w-full p-8'>
          <div>
            <p className='text-[#2B788B] font-[Montserrat] font-bold'>E-COURSE PLATFORM</p>
            <h1 className='font-[DelaGothicOne] text-black font-normal text-6xl mt-6'>Learning and teaching online, made easy.</h1>
          </div>
          <div className='w-[60%] mt-8'>
            <h2 className='font-[Montserrat] font-semibold text-[#757575] text-md'>Practice your English and learn new things with the platform.</h2>
          </div>
          <div>
            <button className='rounded-full bg-[#C3DCE3] px-3 py-2.5 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-10'>
              About Platform
            </button>
          </div>
          <div className='mt-10 flex items-center justify-start w-full flex-row h-fit gap-10'>
            <div>
              <div className='font-[DelaGothicOne] flex items-center text-3xl'>
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
        <div className='w-full relative'>
          <div>
            <img className="absolute top-36" src={JoyStick}></img>
            <img className="absolute" src={Boy}></img>
            <img className="absolute -right-44" src={Plant}></img>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home