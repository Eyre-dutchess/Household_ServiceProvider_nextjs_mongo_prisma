"use client";

import React from 'react'
import { IconType } from 'react-icons';

interface CateProps{
  label: string
  icon:IconType
  selected: boolean
  onClick: (label: string)=> void
}
export const CategoryInput = ({
  label, icon:Icon, selected, onClick}: CateProps) => {
  return (
    <div onClick={()=>onClick(label)} className={`col-span-1 rounded-md w-full aspect-[3/2] border border-blue-400/50 text-blue-400/75 font-semibold cursor-pointer flex flex-col items-center justify-center gap-3
                    transition hover:bg-blue-400/75 hover:text-white/75 ${selected?"bg-blue-400/50 border-none text-white shadow-lg shadow-blue-200/50":""}`}>
          <Icon size={32}/>
          {label}
    </div>
  )
}
