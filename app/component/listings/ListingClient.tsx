"use client"

import React, {  useEffect,  useState } from 'react'
import {  useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

import { SafeListing, SafeUser } from '@/app/type'
import { FilterBar } from '../mainpage/FilterBar'
import { ListingCard } from './ListingCard'
import { Button } from '../modal/Button'
import { Container } from '../Container'

interface ListingProps{
    curList: SafeListing[]
    currentUser?: SafeUser | null
}

export const ListingClient = ({curList, currentUser}: ListingProps) => {
    const router = useRouter()
    const params = useSearchParams() as URLSearchParams

    const [newList, setNewList] = useState<SafeListing[]>(curList)
    console.log(curList)
    useEffect(()=>{
      let updatedList: any
      if(params.get("gender")){
        updatedList= curList.filter((item)=> item.gender == params.get("gender")!)
      }else if(params.get("startAge")){
        updatedList = curList.filter((item)=>(item.age >= parseInt(params.get("startAge")!))&& (item.age < parseInt(params.get("endAge")!)))
      }else if(params.get("priceOrder")== "asc"){
        updatedList = curList.sort((a, b)=> b.price - a.price)
      }else if(params.get("priceOrder")== "desc"){
        updatedList = curList.sort((a, b)=> a.price - b.price)
      }else if(params.get("ratingOrder") == "desc"){
        updatedList = curList.sort((a, b)=> b.rating - a.rating)
      }else if(params.get("ratingOrder") == "asc"){
        updatedList = curList.sort((a, b)=> a.rating - b.rating)
      }
        setNewList(updatedList || curList)
    }, [router, params, curList])

    const handleReset = ()=>{
        const url = qs.stringifyUrl({
            url:"/",
            query: undefined
        })

        if(params.get("category")){
           router.push(`${url}`)
          }else{
           router.push(`/listings/${url}`)
          }
    }
    return (
            <div className='flex flex-col w-full h-full lg:mt-10 rounded-lg py-6 gap-6 shadow-md'>
                <Container>
                <div className='flex flex-col items-center justify-center gap-2 pt-8 md:pt-0'>
                    <h3 className='text-blue-800/75 text-3xl pl-4 w-full md:text-center lg:text-5xl'>Our Listings</h3>
                    <p className='w-full  h-[5px] rounded-full bg-gradient-to-r from-blue-400/75 to-orange-400 lg:via-orange-400 lg:to-blue-400/75'></p>
                    {/* filter bar */}
                    <div className='pb-8 w-full flex flex-row items-center justify-center gap-2 lg:gap-8'>
                        <div className='w-[15vw] max-w-[6em] z-40'>
                            <Button label='reset' defauBtn onClick={handleReset}/>
                        </div>
                        <FilterBar label="gender" curList={curList} />
                        <FilterBar label="age" curList={curList} />
                        <FilterBar label="price" curList={curList} />
                        <FilterBar label="rating" curList={curList} />
                    </div>
                </div>
                </Container>
                <div className='grid grid-cols-1 px-8 md:grid-cols-2 md:px-4 md:grid-cols-3 lg:grid-cols-4 gap-[calc(1vw_+_1em)]'>
                    {newList?.map((item)=>{
                        return <ListingCard key={item.id} data={item} currentUser={currentUser}/>
                    })}
                </div>
            </div>
  )
}
