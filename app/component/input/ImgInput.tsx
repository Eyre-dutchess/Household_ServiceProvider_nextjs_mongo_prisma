" use client"
import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any;
}

interface ImgProps{
    value: string
    onChange: (value: string)=>  void
}

export const ImgInput = ({value, onChange}: ImgProps) => {

    const handleUpload = useCallback((result: any) =>{
        onChange(result.info.secure_url)
        console.log()
    }, [onChange])

  return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="fnhetpjm"
            options={ {
               maxFiles: 1
           } }
            >
            {({ open })=>{
                return (
                    <div onClick={()=> open?.()}
                        className='cursor-pointer border overflow-hidden rounded-lg p-2 w-full h-[40vh] relative'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-4 text-2xl font-medium text-blue-600/75 hover:opacity-75'>
                            <h3>Add an image here</h3>
                            <TbPhotoPlus size={40}/>
                        </div> 
                        {value && 
                          (<div className='absolute w-full h-full top-0 left-0'>
                            <Image 
                                alt="upload img"
                                src={value}
                                fill
                                style={{objectFit:"cover", objectPosition:"top", width:"100%", height:"100%"}}
                            />
                          </div>)}
                    </div>
                )
            }}
        </CldUploadWidget>
  )
}
