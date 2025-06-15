"use client"

import React from 'react'

interface ItemProps{
    label: string
    onClick:()=>void
    isInCommu?: boolean
}
export const MenuItem : React.FC<ItemProps>= ({isInCommu,label, onClick}) => {
  return (
    <div className={`w-full px-5 py-2 text-xs cursor-pointer transition text-white/50 hover:bg-blue-400 hover:text-white
      ${isInCommu?"bg-blue-400/75 rounded-md ":""}
      `} 
      onClick={onClick}>{label}</div>
  )
}
