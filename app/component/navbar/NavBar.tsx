"use client"

import React, { useCallback,useEffect,useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineHome } from 'react-icons/ai'

import { SafeUser } from '@/app/type'
import { Avatar } from "../Avatar"
import { NavMenu } from './NavMenu'
import { FaBars } from 'react-icons/fa'
import { Navbg } from './Navbg'
import { Container } from '../Container'

interface NavProps{
    curUser?: SafeUser | null
}
export const NavBar = ({curUser}: NavProps) => {

    const [show, setShow] = useState(false)
    useEffect(()=>{
        setShow(false)
    }, [])
    const toggleShow = ()=>{
        setShow((value)=> !value)
    }
    
    const router = useRouter()
    const pathName = usePathname()
    const [isInCommu, setIsInCommu] = useState<boolean>(false)
    useEffect(()=>{
        if(pathName?.includes("communication")){
            setIsInCommu(true)
        }else{
            setIsInCommu(false)
        }
    }, [isInCommu, pathName])

  return (
    <Container>
        <div className={`w-full flex flex-row items-center justify-between  p-3 md:p-6 lg:pr-12 relative z-40 
                ${curUser?"text-blue-900/75":"text-blue-400/50"}  
                ${isInCommu?"hidden":""}
                `}>
            <div className={`w-max cursor-pointer  text-3xl rounded-full px-2 transition text-blue-100/50 hover:bg-blue-400/5  hover:text-white/50 hover:shadow-md `}>
                <div onClick={()=> router.push("/")}><AiOutlineHome /></div>
            </div>
            <div onClick={toggleShow} className={`w-1/3 px-4 cursor-pointer hover:bg-blue-100/50 max-w-[250px] bg-blue-100/25 rounded-full py-2 md:py-3 flex flex-row items-center justify-center gap-3
                `}>
                <FaBars />
                {curUser ? 
                    (
                        <p>  Hi, {curUser.name}</p>
                    ):
                    (
                    <Avatar src="/images/avatar.png"/>)}
            </div>
            <NavMenu curUser={curUser} show={show} isInCommu = {isInCommu}/>
        </div>
    </Container>
  )
}
