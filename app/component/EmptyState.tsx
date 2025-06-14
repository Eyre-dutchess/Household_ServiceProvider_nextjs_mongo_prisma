"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from './modal/Button'

interface EmptyProps{
    title?: string
    subTitle?: string
    showReset?: boolean
}

export const EmptyState: React.FC<EmptyProps> = ({
    title, subTitle, showReset
}) => {
    const router = useRouter()
  return (
    <div className='h-[60vh] flex flex-col items-center justify-center gap-3'>
        <h3 className='text-2xl font-semibold text-blue-900/75'>{title}</h3>
        <h6 className='text-md font-semibold text-blue-900/50'>{subTitle}</h6>
        {showReset && <Button label="Reset" defauBtn onClick={()=> router.push("/")}/>}
    </div>
  )
}
