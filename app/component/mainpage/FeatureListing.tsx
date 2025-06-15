"use client"

import React, { useEffect,useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaLongArrowAltRight, FaQuoteLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '../modal/Button'
import { SafeListing } from '@/app/type'

interface FeatureProps{
  listings: SafeListing[]
}
export const FeatureListing = ({listings}:FeatureProps) => {
  const router = useRouter()
  const [value, setValue] = useState(0)

  useEffect(()=>{
    const lastValue = listings.length - 1
    if(value < 0){
      setValue(lastValue)
    }
    if(value > lastValue){
      setValue(0)
    }
  }, [value, listings])

useEffect(()=>{
  let slider = setInterval(()=>{
    setValue(value - 1)
  }, 3000)
  return ()=>{
    clearInterval(slider)
  } 
}, [value])
  
  return (
    <div className='max-w-[600px] relative mx-auto  w-full h-[70vh] bg-blue-100/50 p-[2vw] mt-6 shadow-inner rounded-xl shadow-blue-400/50 '>
        <div className='w-full h-full overflow-hidden relative '>
            {listings.map((item, index)=>{
                let position = "next"
                if(index === value){
                  position = "current"
                }
                if(index === value - 1 || (value === 0 && index === listings.length - 1)){
                  position = "prev"
                }
                return (
                  <div key={index} className={`${position} transition duration-500 w-full h-full pt-4  absolute top-0 left-0 flex flex-col items-center justify-center gap-1`}>
                      <FaQuoteLeft size={40} className='text-blue-800/25 absolute top-8 left-20'/>
                      <div className=' relative w-[calc(5vw_+_150px)] aspect-square border rounded-full overflow-hidden'>
                        <Image 
                          fill
                          alt="emplyee pic"
                          src={item.imgSrc}
                          style={{objectFit:"cover", width:"100%", height:"100%"}}
                        />
                      </div>
                      <div className='flex flex-col items-center py-2'>
                        <h6 className='text-2xl text-blue-800/75'>{item.name}</h6>
                        <p className='text-lg text-blue-800/25 mb-4'>{item.age} years old</p>
                        <p className='text-md text-blue-800/50 text-center px-12'>{item.description.substring(0, 100)}...</p>
                      </div>
                      <div className='w-1/2'>
                        <Button label='Know more about me' icon={FaLongArrowAltRight} defauBtn 
                          onClick={()=> router.push(`/listings/${item.id}`)}/>
                      </div>
                      
                  </div>
                )
            })}
        </div>
        <div className='w-[3em] h-max rounded-md border border-blue-600/50 hover:border-none absolute top-[45%] -left-3 z-30'>
              <Button icon={FaChevronLeft} defauBtn onClick={()=> setValue(value - 1)}/>
        </div>
        <div className='w-[3em] h-max rounded-md border border-blue-600/50   hover:border-none absolute top-[45%] -right-3 z-30'>
              <Button icon={FaChevronRight} defauBtn  onClick={()=> setValue(value + 1)}/>
        </div>
    </div>

  )
}
