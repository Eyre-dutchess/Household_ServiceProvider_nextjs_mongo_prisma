"use client"

import {  useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

import { SafeListing, SafeUser } from '../type'
import { FeatureListing } from './mainpage/FeatureListing'
import { Container } from './Container'
import { CatoListing } from './mainpage/CatoListing'
import Loading from '../loading'

interface ListProps{
  listings?: SafeListing[] | null
  currentUser?: SafeUser | null
}
export const MainSec = ({listings, currentUser}: ListProps) => {
    const params = useSearchParams();
    const category = params?.get("category")

    if(!listings) return null;
    if(!category){
        return (
            <Container>
                <div className=' py-16 md:pt-24 lg:pt-32 relative z-40'>
                    <h3 className='text-2xl lg:pl-4 text-blue-800/75 font-semibold w-full text-start md:text-3xl lg:text-5xl lg:text-center'>Featured Employees of the Week</h3>
                    <div className='bg-gradient-to-r w-full h-[3px] lg:h-[6px] rounded-full from-orange-400 via-blue-800 to-orange-400'></div>
                    <FeatureListing listings={listings?.slice(0, 5)}/>
                </div>
            </Container>
        )
    }
  return (
    <Container>
        <Suspense fallback={<Loading />}>
          <CatoListing category={category} listings={listings} currentUser={currentUser}/>
        </Suspense>
    </Container>
  )
}
