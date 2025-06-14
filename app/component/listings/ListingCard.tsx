"use client"

import React, { useCallback, useMemo }  from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import {  SafeListing, SafeUser } from '@/app/type'
import { useFavBtn}  from '@/app/hook/useFavBtn'


interface ListingCardProps{
    data: SafeListing
    currentUser?: SafeUser | null
}
export const ListingCard: React.FC<ListingCardProps> = ({
    data, currentUser
}) => {
    const router = useRouter()
  
    const {isFaved , handleFav }= useFavBtn({curUser:currentUser, listingId:data.id})

    const handleClick = (e: React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation()
        const target = e.target as HTMLElement
            if(target.tagName === "svg"){
                return
            }else{
                router.push(`/listings/${data.id}`)}  
        
    }
  return (
    <div onClick={handleClick} 
        className='group relative z-0 cursor-pointer hover: w-full shadow-sm p-2 items-center rounded-md gap-2 grid grid-cols-2 md:flex md:flex-col'>
        <div className=' w-4/5 ml-4 md:ml-0 md:w-full shadow-inner shadow-blue-400 aspect-square col-span-1  rounded-full md:rounded-md overflow-hidden relative z-10'>
            <Image 
                alt="listing img"
                src={data.imgSrc}
                fill
                style={{objectFit:"cover", width:"100%", height:"100%"}}
                className='group-hover:scale-110 rounded-full md:rounded-md transition p-2'
            />
        </div>
        <div>
            <div className='content text-blue-800 text-sm w-full md:text-md p-4 flex flex-col items-start justify-center gap-2'>
                <h6>Name: <span >{data.name}</span></h6>
                <p>Skills: <span>{data.skills.slice(0, -1).join(", ")}</span></p>
                <p>Price: <span>{data.price}</span></p>
            </div>
        </div>
        <div className='w-[2em] h-[2em] absolute top-4 right-8 z-0 '>
            <button onClick={handleFav} className= 'transition relative w-full h-full cursor-pointer scale-75 hover:scale-110'>
                <AiFillHeart className={`w-full h-full absolute left-2 top-2  ${isFaved?"text-orange-600":" text-orange-200/50 "}`}/>
                <AiOutlineHeart  className='w-full h-full absolute left-2 top-2 text-orange-600'/>
            </button>
        </div>
    </div>
  )
}
