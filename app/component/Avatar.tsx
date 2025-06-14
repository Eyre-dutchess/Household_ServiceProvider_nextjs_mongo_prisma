"use client"

import Image from 'next/image'
import React from 'react'

interface IMGProps{
    src: string
}
export const Avatar: React.FC<IMGProps> = ({src}) => {
  return (
    <div className='relative w-[1.5em] h-[1.5em] rounded-full overflow-hidden opacity-50'>
       <Image 
            alt="Avatar img"
            src={src}
            fill
            style={{objectFit:"cover", width:"100%", height:"100%"}}
        /> 
    </div>
    
  )
}
