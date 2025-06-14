"use client"

import React from 'react'
import { FadeLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col text-3xl items-center justify-center '>
        <FadeLoader  color="orange"/>
    </div>
  )
}
