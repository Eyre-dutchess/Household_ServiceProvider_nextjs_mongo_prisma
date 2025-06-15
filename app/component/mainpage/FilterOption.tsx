"use client"

import React from 'react'

interface FilterProps{
    label: string
    onClick: (e:React.MouseEvent<HTMLElement>)=>void
}
export const FilterOption = ({label, onClick}:FilterProps) => {
    
    if(label=="gender"){
        return (
            <div className="filter-option ">
                <span onClick = {onClick}>Male</span>
                <hr/>
                <span onClick = {onClick}>Female</span>
                <hr/>
                <span onClick = {onClick}>he/she/they</span>
            </div>
            )
    }
    if(label === "age"){
        return (
            <div className="filter-option ">
                <span onClick = {onClick}>younger than 30</span>              
                <hr/>
                <span onClick = {onClick}>30--40</span>              
                <hr/>
                <span onClick = {onClick}>older than 40</span>
            </div>
        )
    }
    if(label==="price"){
        return (
            <div className="filter-option ">
                <span  onClick = {onClick}>cheaper</span>
                <hr/>
                <span  onClick = {onClick}>less cheaper</span>
            </div>
        )
    }
    return (
            <div className="filter-option ">
                <span  onClick = {onClick}>rating higher</span>
                <hr/>
                <span  onClick = {onClick}>rating lower</span>
            </div>
    )
}
