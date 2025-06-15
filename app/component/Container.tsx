"use client";

import React from 'react'

interface ContnProps{
    children: React.ReactNode
}
export const Container:React.FC<ContnProps> = ({
    children
}) => {
  return (
    <div className='max-w-[2520px] px-4 md:px-[calc(2vw_+_0.5em)] lg:px-[calc(2vw_+_1em)] xl:px-[calc(5vw_+_1.5em)]'>
        {children}
    </div>
  )
}
