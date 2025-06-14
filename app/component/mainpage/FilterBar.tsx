"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { FaChevronCircleDown } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'

import { FilterOption } from './FilterOption'
import { useFilter } from '@/app/hook/useFilterBtn'
import { SafeListing } from '@/app/type'

interface FilterProps{
    label: string
    curList: SafeListing[]
}
export const FilterBar = ({label, curList}: FilterProps) => {
  
    const [open,setOpen] = useState(false)
    useEffect(()=>{
      setOpen(false)
    }, [])
    const handleShow = useCallback(()=>{
        setOpen((value)=> !value)
    }, [open])

    
  const router = useRouter()
  const params = useSearchParams() as URLSearchParams
  const cato = params.get("category")

  const handleClick = useCallback((e:React.MouseEvent<HTMLElement>) =>{
    const target = e.target as HTMLElement
    const curLabel = target.innerText as string
  
    const url = useFilter({label, optionLabel:curLabel, params})

    if(params.get("category")){
       router.push(`${url}`)
    }else{
      router.push(`/listings/${url}`)
    }
    
     setOpen(false)
  }, [params, router, curList])

  return (
    <div className='relative z-30'>
        <div className='filter-btn ' 
            onClick={handleShow}>
            <p>{label}</p>
            <FaChevronCircleDown />
        </div>
        {open && (
            <FilterOption label={label} onClick={handleClick}/>
        )}
    </div>
  )
}
