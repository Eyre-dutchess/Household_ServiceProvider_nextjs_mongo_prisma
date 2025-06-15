"use client"

import React, {  useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface RatingProps{
    value: number
    onClick: (value: number)=>void
}
export const RatingInput = ({value, onClick}: RatingProps) => {
    const [rating, setRating] = useState(value)
    const [rateClr, setRateClr] = useState(null)
  
  return (
    <div 
        className='flex flex-row w-[20vw] items-center justify-center gap-3'>
        {[...Array(5)].map((star, index)=>{
            const curRating = index + 1
            return (
                <label className='' key={index}>
                    <input type="ratio" id="rate" defaultValue={curRating}
                        onClick={()=> {setRating(curRating)
                            onClick(curRating)
                        }} className='w-0'
                    />
                    <FaStar size={30} className='cursor-pointer' color={curRating <= (rating || rateClr!) ?"blue":"grey"}/>
                </label>
            )
        })}
        <p>{rating}</p>
    </div>
  )
}
