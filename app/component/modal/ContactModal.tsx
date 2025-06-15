"use client"

import React  from 'react' 
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Modal } from './Modal'
import { useContactModal } from '@/app/hook/useContactModal'


export const ContactModal = () => {
    const contactModal = useContactModal()
    const router = useRouter()

    const handleClose = () =>{
        contactModal.onClose()
        toast.success("Thank you for contacting us!")
        router.push('/')
        router.refresh()
    }
    const body = (
        <div className='w-2/3 mx-auto flex flex-col space-y-3 text-blue-800/75 py-6'> 
            <h6 className='text-xl'>You can contact us here on </h6>
            <span className='underline underline-offset-4 font-bold'>012-2345678</span>
            or
            <span className='underline underline-offset-4 font-bold'>EyreJinx@outlook.com</span>
        </div>
    )
  return(
    <Modal 
        title='Contact Us'
        body={body}
        open={contactModal.open}
        onClose={handleClose}
        onSubmit={()=>{}}
        actionLabel=""
    />
  )
}
