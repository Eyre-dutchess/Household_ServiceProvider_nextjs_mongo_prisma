"use client"

import React from 'react'
import { FaAddressCard, FaGoogle, FaInstagram, FaLinkedin, FaPhone, FaPinterest } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Container } from './Container'
import { FooterLink } from './FooterLink'

export const footerLinks = ["service", "booking", "cancellation", "question"]

export const Footer = () => {
  const router = useRouter()

  const handleClick = (
    e:React.MouseEvent<HTMLElement>
  )=>{
    e.stopPropagation()
    const target = e.target as HTMLElement
    const curLabel = target.ariaLabel as string
    router.push(`/policy/?label=${curLabel}`)
  }
  return (
    <Container>
      <div className=' w-full px-[5vw] pt-6 pb-10 md:grid md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3'>
          <h3 className='md:translate-y-12  h-[2em]  col-span-2 lg:col-span-3  w-full text-xl md:text-2xl font-bold text-blue-800/50'>Contact Us</h3>
          <div className='h-max  row-start-2 col-start-1 flex flex-col py-3 '>
            <p className='flex flex-row gap-2 text-blue-800 font-light text-sm'><FaPhone />: 012-3456789</p>
            <p className='flex flex-row gap-2 text-blue-800 font-light text-sm'><MdEmail />EyreJinx@outlook.com</p>
            <p className='flex flex-row gap-2 text-blue-800 font-light text-sm'><FaAddressCard />No.125, Taian Rd., Shandhai, China</p>
          </div>
          <div className='h-max md:pl-14 relative z-40 grid-rows-subgrid grid-cols-subgrid row-start-2 lg:col-start-3 flex flex-col py-3 text-blue-800 font text-sm'>
              
                  {footerLinks.map((link, index)=>{
                    return (
                      <FooterLink key={index} ariaLabel={link} 
                      onClick={handleClick}/>
                    )
                  })}
              
          </div>
          <div className=' md:-translate-y-4 h-max w-[100px] flex flex-row gap-2  py-3 grid-cols-subgrid md:col-start-1 text-blue-800 items-center justify-between'>
              {/* Link to our page on google-- TBSU */}
              <Link href={"/"}><FaGoogle /></Link>
              {/* Link to our page on Instagram-- TBSU */}
              <Link href={"/"}><FaInstagram /></Link>
              {/* Link to our page on Linkedin-- TBSU */}
              <Link href={"/"}> <FaLinkedin /></Link>
              {/* Link to our page on Pinterest-- TBSU */}
              <Link href={"/"}><FaPinterest /></Link>
          </div>
      </div>
    </Container>
  )
}
