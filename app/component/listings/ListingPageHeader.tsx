"use client"

import { SafeListing } from '@/app/type'
import Image from 'next/image'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'

interface HeaderProps{
    listing: SafeListing
}
export const ListingPageHeader: React.FC<HeaderProps> = ({listing}) => {
  return (
    <div className='p-4 relative z-30 flex flex-col items-center md:grid md:grid-cols-2 gap-6 md:col-span-2 w-full h-[60vh]'>
        <FaBookmark size={32} className='absolute md:top-12 md:scale-[1.5] md:left-12 md:rotate-0 md:scale-110 z-40 text-orange-400 left-12 sm:left-[15vw] -top-2 rotate-[-30deg]'/>
        <div className='w-full sm:w-2/3 md:w-full h-full col-span-2 md:col-span-1 rounded-md md:rotate-[-20deg] md:translate-y-8 relative z-0 overflow-hidden'>
            <Image alt="bg img" src={listing.imgSrc} fill style={{objectFit:"cover",objectPosition:"top", width:"100%", height:"100%"}} className='scale-150'/>
        </div>
        <div className='hidden md:pl-12 md:flex flex-col text-blue-800 gap-3 p-6 items-start justify-center relative z-40 h-full bg-gradient-to-b from-white/0 via-white/50 to-white'>
          <h3 className='md:text-2xl lg:text-4xl text-lg bg-blue-400 text-blue-100 px-2 py-2 lg:py-4 rounded-md font-semibold'>My name is {listing.name}</h3>
          <p className='md:text-lg lg:text-2xl text-blue-400'>{listing.description}</p>
        </div>
      </div>
  )
}
