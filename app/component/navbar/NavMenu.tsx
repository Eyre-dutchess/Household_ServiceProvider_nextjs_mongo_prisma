"use client"

import React, { useEffect, useState } from 'react'
import { MenuItem } from './MenuItem'
import { signOut } from 'next-auth/react'
import { useRegisterModal } from '@/app/hook/useRegisterModal'
import { useLoginModal } from '@/app/hook/useLoginModal'
import { useAddnewModal } from '@/app/hook/useAddnewModal'
import { SafeUser } from '@/app/type'
import { useRouter } from 'next/navigation'

interface NavProps{
    curUser?: SafeUser | null
    show?: boolean
    isInCommu?: boolean
}
export const NavMenu = ({curUser,isInCommu, show}: NavProps) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const addnewModal = useAddnewModal()
    const router = useRouter()

  return (
    <div  className={`z-40 bg-blue-400/75 shadow-sm shadow-blue-200 rounded-md overflow-hidden 
        ${isInCommu?"bg-transparent text-center relative shadow-none":"absolute top-16 md:top-20 right-3 md:right-6 lg:right-12"}
        ${show?"scale-y-100":"scale-y-0"} transform origin-top transition `}>
        {curUser?
            (
            <div className='w-full flex flex-col'>
                { curUser.isAdmin &&  
                    <div>
                        <MenuItem label="Add new Service" onClick={()=> addnewModal.onOpen()}/>
                        <hr/>
                    </div>}
                <MenuItem label="All Service" onClick={()=> router.push("/listings")}/>
                <hr/>
                <MenuItem label="All Policies" onClick={()=> router.push("/policy")}/>
                <hr/>
                <MenuItem label="My Favorites" onClick={()=> router.push("/favorites")}/>
                <hr/>
                {/* <MenuItem label="My Messages" isInCommu={isInCommu} onClick={()=> router.push("/communication")}/> */}
                <hr/>
                <MenuItem label="Log Out" onClick={()=> signOut()} /> 
            </div>
        )    
        :(
            <div className='w-full flex flex-col'>
                <MenuItem label="Register" onClick={registerModal.onOpen}/>
                <hr/>
                <MenuItem label="Log In" onClick={loginModal.onOpen} />
            </div>)}
        
    </div>
  )
}
