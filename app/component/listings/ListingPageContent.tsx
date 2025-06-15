"use client"

import React  from 'react'
import { useRouter } from 'next/navigation'


import { SafeListing } from '@/app/type'
import { Button } from '../modal/Button'
import { useContactModal } from '@/app/hook/useContactModal'

interface ContentProps{
    listing: SafeListing
}
export const ListingPageContent = ({listing}: ContentProps) => {
    const router = useRouter()
    const contactModal = useContactModal()

    // const handleNewCommu = useCallback(()=>{
        // const newCommuId = uuidv4().toString()
        // const newTopic = `#${listing.id}/${listing.name}/${listing.category}`
        // axios.post("/api/communication", {id:newCommuId, topic: newTopic})
        // router.push(`/communication/${newCommuId}`)
    // }, [listing])
    
  return (
    <div className='w-full min-h-[40vh] p-4 lg:py-20 z-40 md:pt-12 flex flex-col gap-4 md:flex-row lg:items-start lg:justify-between relative rounded-md font-semibold text-blue-900 content shadow-md bg-white/75'>
          <div className='w-1/2 '>
                <div className='flex md:hidden flex-col  gap-2'>
                    <h3 className='text-lg  w-max bg-blue-400 text-blue-100 px-2 py-1 rounded-md font-semibold'>My name is {listing.name}</h3>
                    <p >Skills: <span>{listing.skills.slice(0, -1).join(", ")}</span></p>
                </div>
                <p className='hidden md:block'>Skills: <span>{listing.skills.slice(0, -1).join(", ")}</span></p>
                <p className=''>Age: <span>{listing.age}</span></p>
                <p>Gender: <span>{listing.gender}</span></p>
                <p>Average: <span>${listing.price}/per hour</span></p>
          </div>
          <div className='w-full md:w-1/2 review'>
            <h6>My Reviews:</h6>
            <p>1.Lorem ipsum dolor sit amet consectetur, </p>
            <p>2.adipisicing elit. Eos modi, ea ipsum eius </p>
            <p>3.perspiciatis placeat quos dolorum nemo reiciendis,</p>
            <p>4.nisi quisquam molestiae repellendus, aliquam nesciunt </p>
            <p>5.explicabo magni tenetur harum nostrum architecto non quasi a magnam! </p>
          </div>
          <div className='md:absolute bottom-8 left-4 w-full sm:w-2/3 mx-auto mt-4 md:w-1/3'>
            <Button defauBtn label='Contact me now' onClick={contactModal.onOpen}/>  
          </div>
    </div>
  )
}
