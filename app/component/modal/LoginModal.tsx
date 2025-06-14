"use client";

import React, { useCallback, useState } from 'react'
import { AiOutlineGithub, AiOutlineInstagram } from 'react-icons/ai';
import {  useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useLoginModal } from '@/app/hook/useLoginModal';
import { useRegisterModal } from '@/app/hook/useRegisterModal';

import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from '../input/Input';

export const LoginModal = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const toggle = useCallback(()=>{
    registerModal.onOpen()
    loginModal.onClose()
  }, [loginModal, registerModal])

   const {handleSubmit, register, formState:{errors}} = 
      useForm<FieldValues>({
        defaultValues:{
          email:"",
          password:"",
          name:""
        }
      })
    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        setLoading(true)

        signIn("credentials", {
          ...data,
          redirect: false
        })
        .then((callback: any)=>{
          setLoading(false)
          if(callback?.ok){
            loginModal.onClose()
            toast.success("Logged into your account!")
            router.refresh()
          }
          if(callback?.error){
            toast.error(callback.error)
          }
        })
    }
  const body =(
      <div className='px-4 md:px-[5vw] my-4 flex flex-col gap-3'>
        <h4 className='text-blue-900/75 text-lg text-center '>Log into your account</h4>
        <div className='flex flex-col gap-2'>
          <Input modalInput id="email" label="Email: " pl="placeholder-shown:pl-14 focus:pl-2" placeholder='e.g. example@eee.com' register={register} errors={errors} required/>
          <Input modalInput id="password" label="Passwrod: " type="password" pl="placeholder-shown:pl-24 focus:pl-2" placeholder='e.g. *****' register={register} errors={errors} required/>
        </div>
        <p className='w-full h-[2px] flex items-center justify-center bg-neutral-200/50 text-neutral-200/75 my-4'>OR</p>
        <div className='flex flex-col gap-2'>
          <Button defauBtn icon={AiOutlineGithub} label="Github" onClick={()=> {}} />
          <Button defauBtn icon={AiOutlineInstagram} label="Instagram" onClick={()=> {}} />  
        </div>
      </div>
    )
  const footer =(
    <p className='w-full mt-8 mb-2 opacity-75 text-center text-sm font-light text-blue-800/50 '> Don't have an account yet?
      <span onClick={toggle} className='text-blue-800/75 px-2 cursor-pointer font-semibold hover:text-blue-800 hover:underline transition'>Register</span> now
    </p>
  )
  return (
    <Modal 
      title='Welcome back!'
      body={body}
      footer={footer}
      open={loginModal.open}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel='Confirm'
      disabled={loading}
    />
  )
}
