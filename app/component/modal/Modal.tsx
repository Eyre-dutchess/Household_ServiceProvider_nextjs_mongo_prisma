"use client"

import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { Button } from './Button'

interface ModalProps{
    open: boolean,
    onClose: ()=> void
    onSubmit: () => void
    title?: string
    body?: ReactElement
    footer?: ReactElement
    disabled?: boolean
    actionLabel?: string
    secActionLabel?: string
    secAction?: ()=>void
}
export const Modal: React.FC<ModalProps> = ({
    open, onClose, onSubmit, title, body, footer, disabled, actionLabel, secAction, secActionLabel
}) => {
    const [openModal, setOpenModal] = useState(open)
    useEffect(()=>{
        setOpenModal(open)
    }, [open])
    const handleClose = useCallback(()=>{
        setOpenModal(false)
        setTimeout(()=>{
            onClose()
        }, 400)
    }, [])
    if(!openModal) return null;
    return (
        <div className='fixed top-0 left-0 z-50 w-screen h-screen bg-neutral-800/50 flex items-center justify-center'>
            <div className='relative w-4/5 max-w-[700px] bg-white rounded-lg py-6 px-4 flex flex-col '>
                <Button closeBtn onClick={handleClose} icon={FaTimes}/>
                <h1 className='w-full pt-6 pb-1 text-center text-blue-800/75 text-3xl font-bold border-b-2 border-blue-800/25'>{title}</h1>
                {body}
                
                {footer}
                <div className='w-full px-4 md:px-[5vw] flex flex-row gap-4'>
                    {secAction && secActionLabel && (
                        <Button outlineBtn label={secActionLabel} onClick={secAction}/>
                    )}
                    <Button defauBtn label={actionLabel} onClick={onSubmit}/>
                </div>
            </div>
        </div>
    )
}
