"use client"

import React, { useCallback, useState } from 'react'

interface SkillProps{
    skill: {label:string, value: string}
    output:string[],
    setOutput: (output:string[])=> void
    onClick: (skills:string[]) => void
}

export const SkillInput = ({ skill, output, setOutput, onClick}:SkillProps) => {
    const [selected, setSelected] = useState(false)

    const handleSkillClick = useCallback(
      (
        e:React.MouseEvent<HTMLElement>
      )=>{
          setSelected(value=> !value)
          const target = e.target as HTMLElement
          const curLabel = target.innerText 
          
          let arr = output || []
          if(!arr.includes(curLabel.toString())){
            let result = [...arr, curLabel.toString()]
            setOutput(result)
            onClick(result)
          }else{
            let result =arr.filter((item)=> item!== curLabel.toString())
            setOutput(result)
            onClick(result)
          }
          
          }, [output, selected])
    
  return (
    
        <div onClick={handleSkillClick}
            className={`h-[2em] flex items-center justify-center rounded-full border border-blue-400/50 text-blue-400/75 cursot-pointer transition
              hover:text-white hover:bg-blue-400/50  hover:shadow-lg ${selected?"text-white bg-blue-400/50 border-none":""}`}
            >
          <span className='px-4 w-full rounded-full cursor-pointer'>{skill.label}</span>
        </div>
  )
}
