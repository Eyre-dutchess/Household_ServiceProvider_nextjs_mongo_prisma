"ues client"

import React from 'react'
import { IconType } from 'react-icons'

interface BtnProps{
    label?: string
    icon?: IconType
    onClick?: ()=> void
    closeBtn?: boolean
    defauBtn?: boolean
    outlineBtn?: boolean
    disabled?: boolean
    type?:"submit" | "reset" | "button"
}
export const Button: React.FC<BtnProps> = ({
    label, icon:Icon, onClick, closeBtn, defauBtn, outlineBtn, disabled, type
}) => {
  return (
    <button onClick={onClick} type={type} className={`font-semibold flex gap-3 items-center justify-center transition duration-300
        ${closeBtn ?"w-[2em] h-[2em] absolute top-2 right-2 border-2 border-orange-600/75 bg-white/75 text-orange-600/75 rounded-full p-0 opacity-50 scale-75 hover:shadow-none hover:scale-100 hover:opacity-75":"rounded-md py-2 lg:py-3 hover:shadow-lg"}
        ${defauBtn ? "w-full bg-blue-400/50 text-white/75 hover:bg-blue-400/75 hover:text-white hover:shadow-blue-200/50": ""}
        ${outlineBtn?"w-full border-2 border-blue-800/50 bg-white/75 text-blue-800/75 hover:border-none hover:bg-blue-100/50 hover:text-blue-400 hover:shadow-blue-200/50 ":""}
        ${disabled?"cursor-not-allowed opacity-50 hover:bg-neutral-100 hover:shadow-none hover:border-none hover:text-neutral-400/50":"cursor-pointer "}
        `}>
        {label}
        {Icon && <Icon size={16}/>}
    </button>
  )
}
