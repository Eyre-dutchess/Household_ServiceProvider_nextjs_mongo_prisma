"use client";

import React, { useEffect, useState } from 'react'
import { Loader } from './Loader';
import Loading from '../loading';

interface ClientProps{
    children: React.ReactNode
}
export const ClientOnly: React.FC<ClientProps> = ({children}) => {
  
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(()=>{
        setHasMounted(true)
    })
    if(!hasMounted){
        return (<Loading />)
    } ;
    return (
    <div>
        {children}
    </div>
  )
}
