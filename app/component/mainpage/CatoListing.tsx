"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { getCatoListings, SafeCatoListing } from '@/app/hook/useCatoListings'
import { SafeListing, SafeUser } from '@/app/type'
import { ClientOnly } from '../ClientOnly'
import { EmptyState } from '../EmptyState'
import { ListingClient } from '../listings/ListingClient'

interface CatoProps{
    category : string
    listings: SafeListing[]
    currentUser?: SafeUser | null
}


export const CatoListing = ({category, listings, currentUser}:CatoProps) => {
    const router = useRouter()
    const [current, setCurrent] = useState<SafeCatoListing>()

   useEffect(()=>{
     const curCategory = getCatoListings(category, listings) 
     setCurrent(curCategory)
   }, [category, listings, router])

   if(!current || !category)
    return (
        <ClientOnly>
            <EmptyState showReset title="Can't find any matches. Try a different filter" />
        </ClientOnly>
    )
  return (
    <ClientOnly>
        <div className='w-full min-h-[70vh] mt-6'>
            <div className='w-full  min-h-[70vh]  lg:h-full lg:relative flex flex-col md:flex-row-reverse lg:flex-row items-center lg:justify-start justify-center gap-4 md:px-[5vw] lg:gap-[5vw]'>
                <div className='relative z-40 flex flex-col items-start justify-center md:w-1/2 lg:w-3/4 md:h-max lg:h-full lg:pr-30 lg:-ml-8 lg:py-8 xl:py-16 rounded-r-full  gap-4 pt-3 pb-6  lg:bg-gradient-to-r from-white/0 via-white/75 to-white/5'>
                    <h1 className='text-blue-800/75 font-bold text-4xl lg:text-5xl'>{current.label}</h1>
                    <p className='text-blue-800/75 font-semibold text-xl md:font-light lg:text-2xl '>{current.description}</p>
                </div>
                <div className='relative lg:absolute -top-4 right-0 z-0 w-full h-[40vh] md:w-1/2  lg:w-2/3 lg:h-[45vh] lg:top-24 lg:right-6 rounded-2xl md:rounded-3xl lg:rounded-md overflow-hidden'>
                    <Image 
                        alt='header bg img'
                        src={current.imgSrc}
                        fill
                        style={{objectFit:"cover", width:"100%", height:"100%",  zIndex:"0"}}
                    />
                    <div className='absolute top-0 left-0 z-20 w-full h-full lg:w-1/2 lg:bg-gradient-to-r from-white via-white/50 to-white/0'></div>
                </div>
            </div>

            <ListingClient curList={current.curListings} currentUser={currentUser} />
        </div>
    </ClientOnly>
  )
}
