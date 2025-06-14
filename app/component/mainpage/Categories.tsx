"use client"

import React from 'react'
import { IconType } from 'react-icons'
import { BiSolidBabyCarriage } from 'react-icons/bi'
import { FaToolbox } from 'react-icons/fa'
import { GiBroom, GiTeacher } from 'react-icons/gi'
import { TbChefHat } from 'react-icons/tb'
import { usePathname, useSearchParams } from 'next/navigation'

import { Container } from '../Container'
import { CatoBox } from './CatoBox'

export type CategoryType={
    label: string,
    icon?: IconType,
    bgImg: string,
    description: string
}
export const categories = [
    {
        label:"HouseClean",
        icon: GiBroom,
        bgImg: "/images/house1.jpeg",
        description:"We don't cut corners, we clean them. Our professional team is well known for their commitment and trust worth. Kitchen, bathroom or your work space, no job is too big or too small. Let us bring attention to details while you rest and relax. "
    },
    {
        label:"ChildCare",
        icon: BiSolidBabyCarriage,
        bgImg: "/images/child1.jpeg",
        description:"Your child will be cared for in a warm, protective and nurturing atmosphere. Our passionate caregivers will help your child feel confident and flourish in a safe and creative environment. "
    },
    {
        label:"Handyman",
        icon: FaToolbox,
        bgImg: "/images/handyBg.jpeg",
        description:"We provide a wide range of general repairs, improvements and maintenance jobs. Our uniformed technicians are fully insured professhionals and experts whose sole job is to improve your home with care and quality. "
    },
    {
        label:"Tutor",
        icon: GiTeacher,
        bgImg: "/images/tutor1.avif",
        description:" Home grinds are an excellent way to bolster confidence while increasing attainment. Our highly qualified tutors will help you or your child gain an inside edge and have fun learning."
    },
    {
        label:"Cook",
        icon: TbChefHat,
        bgImg: "/images/cookBg.jpeg",
        description:"Imagine savoring a gourmet meal, tailored exactly to your taste, in the comfort of your own home. Our chefs are dedicated to bring the luxury and sophistication of the fine dining directly to you and craft a memorable culinary experience just for you. "
    },
] 

export default function Categories (){
    const params = useSearchParams()
    const category = params?.get("category");
    const pathName = usePathname();
    const isMainPage = pathName === "/"

    if(!isMainPage){
        return null
    }

  return  ( 
    <Container>
        <div className='z-20 relative w-auto flex flex-row items-center justify-start gap-3 md:gap-6 lg:gap-[5vw] md:justify-center overflow-x-auto hover:shadow-lg hover:shadow-blue-200/50'>
            {categories.map((item)=>{
                return <CatoBox key={item.label} label={item.label} icon={item.icon}  selected={item.label===category} />
            })}
         
        </div>
    </Container>
  )
}



// For over 10 years, i've cared for several families and their lovely children and i'd blessed to watch all the littel angels grow and flourish into the rock stars they are today.