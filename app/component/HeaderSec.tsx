"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'

import Categories from './mainpage/Categories'


export const HeaderSec = () => {
  const params = useSearchParams();
  const category = params?.get("category")

  if(!category){
    return (
      
          <div className='relative  w-full  h-[40vh] flex flex-col justify-end gap-[10vh] mt-10 mb-20'>
              <div className='z-20 font-bold text-white/50 pl-[10vw] md:pl-0 flex flex-col items-start md:items-center   justify-center gap-3 '>
                  <h3 className='text-2xl md:text-5xl'>Our Service</h3>
                  <p className='text-xl md:text-2xl'>To</p>
                  <h1 className='text-3xl md:text-5xl lg:text-7xl'>Your Satisfaction</h1>
              </div>
              <Categories />
              
          </div>
      
    )
  }

  
  return(
    <div className='relative z-10 w-full mt-10'>
        <Categories />
        
    </div>
  )
}
