"use client"

import React from 'react'
import Select from 'react-select'

interface GenderProps{
    gender:{label: string}
    onChange: (gender:{label: string})=> void
}

 const genders = [{label:"Male"},
    {label:"Female"},
    {label:"he/she/they"}]  

export const GenderInput = ({gender, onChange}: GenderProps) => {
  return (
    <div>
        <Select 
            placeholder="e.g. he/she"
            isClearable
            options={genders}
            value= {gender}
            onChange={(value)=> onChange(value)}
            formatOptionLabel={(option: any)=>(
                <p >{option.label}</p>
            )}
            classNames={{
                control:()=> "pl-3 text-blue-600/75 text-sm",
                input:()=> "text-sm text-blue-400/50",
                option:()=>"text-sm text-blue-400/50"
            }}
            theme={(theme)=>({
                ...theme,
                borderRadius: 6,
                colors:{
                    ...theme.colors,
                    primary: "hsl(240, 100%, 60%)",
                    primary25:"hsl(24 ,100%, 70%)"
                }
            })}
        />
    </div>
  )
}
