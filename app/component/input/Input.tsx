"use client"

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps{
    id:string
    label?: string
    placeholder?: string
    type?: string
    modalInput?:boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    required: boolean
    pl?: string
}
export const Input: React.FC<InputProps> = ({
    id, label, placeholder, type="text", modalInput, required, register, errors, pl
}) => {
  return (
    <div className={`transition relative w-full py-2 flex flex-row-reverse gap-4 ${modalInput?"border-2 border-blue-800/25":""}  rounded-md focus-within:border-none focus-within:shadow focus-within:shadow-blue-200/50`}>
        <input id={id} placeholder={placeholder} type={type} {...register(id, {required})}
            className={`${pl&&pl} ${modalInput?"placeholder-shown:translate-y-0 focus:translate-y-2 translate-y-2 border-none":"px-4 pb-0 border-b-2 border-blue-900/50"}
             outline-none bg-transparent w-full rounded-md p-2 text-blue-800/75 focus:placeholder:opacity-25 placeholder:opacity-75 peer`} />
        <label htmlFor={id} className={`text-blue-800/50 transition duration-300 scale-100 
            ${modalInput ?"absolute top-1 left-1 -translate-y-0 scale-75 peer-focus:text-blue-800/50 peer-focus:-translate-y-0 peer-focus:scale-75 peer-placeholder-shown:text-blue-800/75 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100":"relative translate-y-[0.3em] translate-x-1 text-md"}
            `}>{label}</label>
    </div>
  )
}
