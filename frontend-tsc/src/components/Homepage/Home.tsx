import React from 'react'
import { BsLightningFill } from 'react-icons/bs'
import { RiRemoteControl2Fill } from 'react-icons/ri'
import JoyStick from '../../assets/images/image6.png?webp&imagetools'
import Plant from '../../assets/images/image12.png?webp&imagetools'
import Boy from '../../assets/images/casual-life-3d-boy-sitting-at-the-desk-with-open-book.png?webp&imagetools'
import Girl from '../../assets/images/image8.png?webp&imagetools'
import Shoes from '../../assets/images/image10.svg?webp&imagetools'
import Megaphone from '../../assets/images/image11.svg?webp&imagetools'
import GirlBook from '../../assets/images/girl-book.png?webp&imagetools'
import GirlBoy from '../../assets/images/boy-girl.png?webp&imagetools'
import { Helmet } from 'react-helmet'

import {
  ArrowSmallRightIcon
} from '@heroicons/react/24/outline'

import PocketBase from 'pocketbase';


const pb = new PocketBase(import.meta.env.VITE_PB_URL);


function Home() {
  const token = pb.authStore.token;
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={Boy} type="image/png"/>
        <link rel="preload" as="image" href={Girl} type="image/png"/>
      </Helmet>
      <div className='max-w-screen h-full overflow-hidden'>
        <div id='1' className='flex flex-col md:flex-row gap-16 bg-[#F6F5F4] md:p-[5vw] lg:p-[10vw] mb-10 md:m-0'>
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
            <div className='flex flex-row gap-4'>
              {!token ?
              <button 
              className='rounded-xl bg-[#C3DCE3] px-4 py-3 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-10 leading-tight'
              onClick={() =>{document.getElementById('login-button')!.click()}}>
                Sign In ➜
              </button>: null}
              <button className='rounded-xl bg-[#C3DCE3] px-4 py-3 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-10 leading-tight'>
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
              <img className="top-[30%] left-0 w-[30%] hidden absolute md:block" src={JoyStick} loading='eager'></img>
              <img className="absolute left-0 h-full w-[80%] object-contain bottom-0" src={Boy} loading='eager'></img>
              <img className="absolute bottom-0 right-0 h-[75%]" src={Plant} loading='eager'></img>
            </div>

          </div>
        </div>
        <div id='2' className='flex flex-col md:flex-row gap-0 md:gap-16 bg-[#FFFFFF] md:p-[5vw] lg:p-[10vw] mt-10 mb-10 md:m-0'>
          {/* Left Side */}
          <div className='relative w-full p-0 xl:p-8 flex flex-col items-center justify-center mt-10 md:mt-0'>
            <div>
              <img className="w-full h-full" src={Girl} loading='eager'></img>
            </div>

          </div>
          {/* Right Side */}
          <div className='w-full relative flex flex-col items-center justify-center'>
            <div className='px-24 md:px-0 mt-0 md:mt-10'>
              <h2 className="font-[DelaGothicOne] text-black font-normal text-center text-3xl -tracking-[4%] md:text-[2vw] mt-0 md:mt-6 md:text-start leading-tight">Learn a language in a playful way</h2>
              <p className='font-[Montserrat] text-[#757575] font-semibold text-sm md:text-[0.8vw] mt-0 md:mt-5 text-center md:text-start'>Make learning words more fun with mini-games</p>
            </div>
            <div className='w-[100%] flex flex-row mt-16 gap-3 justify-center md:justify-start'>
              <button
                className='relative bg-[#F2D4DC] w-32 aspect-square rounded-xl flex items-end justify-center'
                onClick={() => { window.alert('Clicked') }}
              >
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
        <div id='3' className='flex flex-col md:flex-row md:items-center md:justify-center bg-[#F6F5F4] md:px-[5vw] lg:px-[10vw] mt-10 mb-10 md:m-0'>
          {/* Left Side */}
          <div className='p-8 w-full flex flex-col items-center md:items-start'>
            <div className='mt-0 px-24 md:px-0'>
              <h2 className="font-[DelaGothicOne] text-black font-normal text-center text-3xl -tracking-[4%] md:text-[2.5vw] mt-0 md:mt-6 md:text-start leading-tight">Increase your vocabulary</h2>
              <p className='font-[Montserrat] text-[#757575] font-semibold text-sm md:text-[1vw] mt-0 md:mt-2 text-center md:text-start'>Traditional and new effective approaches to word study</p>
            </div>
            <div>
              <button className='rounded-full bg-[#C3DCE3] px-4 py-3 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-4 md:mt-10 leading-tight'>
                Textbook ➜
              </button>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-full flex justify-end md:justify-center md:items-center bg-cover">
            <img className="w-[70vw] md:w-full" src={GirlBook} loading='eager'></img>

          </div>
        </div>
        <div id='4' className='flex flex-col md:flex-row md:items-center md:justify-center bg-[#FFFFFF] md:p-[5vw] lg:p-[10vw] mt-10 mb-10 md:m-0'>
          {/* Left Side */}
          <div className='relative w-full p-0 xl:p-8 flex flex-col items-center justify-center mt-10 md:mt-0'>
            <div>
              <img className="w-[70vw] md:w-full" src={GirlBoy} loading='eager'></img>
            </div>

          </div>
          {/* Right Side */}
          <div className='p-8 w-full flex flex-col items-center md:items-start'>
            <div className='mt-0 px-24 md:px-0'>
              <h3 className="font-[DelaGothicOne] text-black font-normal text-center text-3xl -tracking-[4%] md:text-[2.5vw] mt-0 md:mt-6 md:text-start leading-tight">Watch your progress every day</h3>
              <p className='font-[Montserrat] text-[#757575] font-semibold text-sm md:text-[1vw] mt-0 md:mt-2 text-center md:text-start'>Save statistics on your achievements, words learned, and mistakes</p>
            </div>
            <div>
              <button className='rounded-full bg-[#C3DCE3] px-4 py-3 text-[#2B788B] font-[Montserrat] font-bold text-sm mt-4 md:mt-10 leading-tight'>
                Statistics ➜
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home