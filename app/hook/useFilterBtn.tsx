"use client";
import React from 'react'
import qs from "query-string"
import { SafeListing } from '../type';


interface FilterProps{
  label?: string,
  optionLabel?: string,
  params: URLSearchParams
}
export const useFilter = ({label, optionLabel, params}:FilterProps
) => {

  let startAge: number = 18
  let endAge: number = 60
  let priceOrder: string = ""
  let ratingOrder: string = ""

  
  let  currentQuery = qs.parse(params.toString())
  let updatedQuery : any ; 
  
  
  if(label=="gender"){
    updatedQuery = {
      ...currentQuery, 
      gender: optionLabel
    }
    
    if(params.get("gender") === optionLabel){
      delete updatedQuery.gender
    }
  }
  if(label=="age"){
    if(optionLabel === "younger than 30"){
      startAge = 18
      endAge=30
    }else if(optionLabel === "30--40"){
      startAge = 31
      endAge=40
    }else{
      startAge = 41
      endAge = 60
    }
    updatedQuery = {
      ...currentQuery, 
      startAge : startAge,
      endAge: endAge
    }
    
    if(params.get("startAge") === startAge.toString() && params.get("endAge") === endAge.toString()){
      delete updatedQuery.startAge
      delete updatedQuery.endAge
    }
  }
  if(label=="price"){
    
    if(optionLabel === "cheaper"){
      priceOrder = "asc"
      
    }else{
      priceOrder = "desc"
      
    }
    updatedQuery = {
      ...currentQuery, 
      priceOrder: priceOrder
    }
    if(params.get("priceOrder") === priceOrder){
      delete updatedQuery.priceOrder
    }
  }
  if(label=="rating"){
    
    if(optionLabel === "rating lower"){
       ratingOrder = "desc"
      }else{
        ratingOrder = "asc"
      }
      updatedQuery = {
        ...currentQuery, 
        ratingOrder: ratingOrder
      }
      if(params.get("ratingOrder") === ratingOrder){
        delete updatedQuery.ratingOrder
      }
    }
    
    const url = qs.stringifyUrl({
      url:"/",
      query: updatedQuery
    }, {skipNull:true})
    return url
  }
  