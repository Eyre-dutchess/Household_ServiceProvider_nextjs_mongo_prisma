"use client";

import React, { useCallback, useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Modal } from './Modal';
import { Input } from '../input/Input';
import { useSearchModal } from '@/app/hook/useSearchModal';

enum STEPS{
  CATEGORY =0,
  INFO= 1, //gender, age, 
  SKILL = 2,
  IMG = 3,
  AVAILIBITY= 4,
  RATING = 5,
  PRICE = 6
}
export const SearchModal = () => {
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const onBack = ()=>{
    setStep((value)=> value - 1)
  }
  const onNext = ()=>{
    setStep((value)=> value + 1)
  }

  const actionLabel = useMemo(()=>{
      if(step === STEPS.CATEGORY){
        return "Next"
      }
      return "Search"
  }, [step])
  const secActionLabel = useMemo(()=>{
      if(step === STEPS.CATEGORY){
        return undefined
      }
      return "Back"
  }, [step])

  const {handleSubmit, watch, setValue, register, formState:{errors}} = 
    useForm<FieldValues>({
      defaultValues:{
        category:"",

      }
    })
    const category = watch("category")

    const setCustomValue = (id: string, value: any) =>{
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
      if(step !== STEPS.PRICE ){
         return onNext()
      }
    }
  let body =(
    <div>
      <h4>Choose a Category</h4>
      <Input id="category" label="category" placeholder='e.g.: breakfast' register={register} errors={errors} required/>
    </div>
  )
 
  return (
    <Modal 
      title='I will Choose for You!'
      body={body}
      open={searchModal.open}
      onClose={searchModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secAction={step== STEPS.CATEGORY ?undefined:onBack}
      secActionLabel={secActionLabel}
      />
  )
}
