"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from "query-string"

interface CatoProps{
    label: string
    icon: IconType
    selected: boolean
}
export const CatoBox: React.FC<CatoProps> = ({
    label, icon:Icon, selected
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() =>{
    let currentQuery = {}
    if(params){
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery : any = {
        ...currentQuery,
        category: label
    }

    if(params?.get("category") === label){
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({
      url:"/",
      query: updatedQuery
    }, {skipNull:true})
    router.push(url)
}, [label, params,router ])
  return (
    <div  onClick={handleClick}
         className={`py-3 px-6 w-full h-full rounded-md flex flex-col items-center justify-center cursor-pointer text-blue-400/50 bg-blue-200/50 border-blue-400/50 border 
                    hover:text-white hover:border-none hover:bg-blue-400/75 hover:shadow hover:shadow-blue-200/50
                    ${selected?"text-white bg-blue-400/75":""}
                    ${params?.get("category")?"text-white/75 border-blue-100/50 shadow-lg":""}
    `}>
        <Icon size={24}/>
        <p className='font-semibold '>{label}</p>
    </div>
  )

}
