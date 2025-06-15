"use client"

import React from 'react'

interface FoorProps{
    ariaLabel: string
    onClick: (e:React.MouseEvent<HTMLElement>)=> void
}
export const FooterLink = ({
    ariaLabel, onClick}: FoorProps) => {

  return (
    <div  className='link-hover capitalize'  onClick={onClick}
        aria-label={ariaLabel}>Our {ariaLabel} Policy</div>
  )
}
