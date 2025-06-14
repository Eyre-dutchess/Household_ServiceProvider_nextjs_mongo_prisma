"use client";

import React, { useCallback, useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Textarea } from '@heroui/input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { useAddnewModal } from '@/app/hook/useAddnewModal';
import { Modal } from './Modal';
import { Input } from '../input/Input';
import { categories } from '../mainpage/Categories';
import { CategoryInput } from '../input/CategoryInput';
import { GenderInput } from '../input/GenderInput';
import { RatingInput } from '../input/RatingInput';
import { SkillInput } from '../input/SkillInput';
import { ImgInput } from '../input/ImgInput';

enum STEPS{
  CATEGORY =0,
  INFO= 1, //gender, age, name, description
  SKILLS = 2,
  IMG = 3,
  RATING = 4,
  PRICE = 5
}
export const defaultSkills=[
  {label:"Home-cook", value:"home-cook"},
  {label:"Pro-cook", value:"pro-cook"},
  {label:"Vagen-cook", value:"vagen-cook"},
  {label:"Deep-clean", value:"deep-clean"},
  {label:"Gardening", value:"gardening"},
  {label:"Farm-care", value:"farm-care"},
  {label:"Pool-clean", value:"pool-clean"},
  {label:"Appliance-clean", value:"appliance-clean"},
  {label:"Baby-care", value:"baby-care"},
  {label:"Toddler", value:"toddler"},
  {label:"Babysitting", value:"babysitting"},
  {label:"Pre-K", value:"pre-K"},
  {label:"Pre-G6", value:"pre-G6"},
  {label:"Pre-College", value:"pre-college"},
  {label:"Art", value:"art"},
  {label:"Plumming", value:"plumming"},
  {label:"Electrics", value:"electrics"},
  {label:"Transport", value:"transport"},
]
export const AddnewModal = () => {
  const addNewModal = useAddnewModal()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState(STEPS.CATEGORY)
  const onBack = ()=>{
    setStep((value)=> value - 1)
  }
  const onNext = ()=>{
    setStep((value)=> value + 1)
  }

  const actionLabel = useMemo(()=>{
      if(step !== STEPS.PRICE){
        return "Next"
      }
      return "Confirm"
  }, [step])
  const secActionLabel = useMemo(()=>{
      if(step === STEPS.CATEGORY){
        return undefined
      }
      return "Back"
  }, [step])

  const {handleSubmit, watch, setValue,reset, register, formState:{errors}} = 
    useForm<FieldValues>({
      defaultValues:{
        category:"",
        gender: "",
        age: 18,
        imgSrc: "",
        rating: 0,
        price: 20,
        name:"",
        skills: null,
        description:""
      }
    })

    const category = watch("category")
    const gender = watch("gender")
    const age = watch("age")
    const imgSrc = watch("imgSrc")
    const rating = watch("rating")
    const price = watch("price")
    const name = watch("name")
    const skills = watch("skills")
    const description = watch("description")

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
      setLoading(true)
      axios.post("/api/addnew", data)
      .then(()=>{
        addNewModal.onClose()
        toast.success("a new listing added!")
        router.push("/listings")
        location.reload()
        reset()
        setStep(STEPS.CATEGORY)
      })
      .catch(()=>{
        toast.error("can't add this new listing")
      })
      .finally(()=>{
        setLoading(false)
      })
    }
  let body =(
    <div className='py-8 px-4 overflow-y-auto flex flex-col items-center gap-4'>
      <h4 className='text-blue-800/50 text-2xl border-b-2  px-4'>Service types</h4>
      <div className='w-4/5 max-h-[50vh] overflow-y-auto grid gap-2 grid-cols-1 sm:grid-cols-2 md:gap-6 mx-auto'>
        {categories.map((item)=>{
          return <CategoryInput key={item.label} 
                  label={item.label} icon={item.icon} selected={category===item.label} 
                  onClick={(category)=> setCustomValue("category", category)}/>
        })}
      </div>
    </div>
  )

  if(step === STEPS.INFO){
    body=(
      <div className='py-8 px-4 overflow-y-auto flex flex-col items-center gap-4'>
          <h4 className=' text-blue-800/50 text-2xl border-b-2  px-4'>Basic Information </h4>
            <div className='border rounded-md shadow-inner shadow-blue-400/25 px-4 h-[40vh] overflow-y-auto flex flex-col'>
                <Input id="name" label="Name: " placeholder='' type="text" register={register} errors={errors} required />
                <div className='grid grid-cols-2 items-center gap-4'>
                  <Input id="age" label="Age: " placeholder='' type="number" register={register} errors={errors} required/>
                  <GenderInput gender={gender} onChange={(value)=> setCustomValue("gender", value)}/>
                </div>
                <Textarea isRequired maxRows={5} label="Description:" variant={'faded'}
                           className='text-blue-800/75 p-4  h-full' placeholder="Enter your description" 
                            onValueChange={(value)=> setCustomValue("description", value)}
                            />
            </div>
      </div>
    )
  }
  if(step === STEPS.IMG){
    body=(
      <div className='w-full py-8 px-4 overflow-y-auto flex flex-col items-center gap-4'>
          <h4 className=' text-blue-800/50 text-2xl border-b-2  px-4'>Your Images </h4>
            <ImgInput value={imgSrc} onChange={(value)=> setCustomValue("imgSrc", value)}/>
      </div>
    )
  }
  
  const [output, setOutput] = useState<string[]>(skills)
  if(step === STEPS.SKILLS){
    body=(
      <div className='py-8 px-4 overflow-y-auto flex flex-col items-center gap-4'>
          <h4 className=' text-blue-800/50 text-2xl border-b-2  px-4'>Your skills </h4>
          <div className='w-full h-[25vh] shadow-inner-md shadow-blue-200/50 px-2 overflow-y-auto py-4 items-center flex flex-wrap gap-2'>
              {defaultSkills.map((skill:any)=>{
              return <SkillInput key={skill.label} skill={skill}
              output={output} setOutput={setOutput} onClick={(skills)=> setCustomValue("skills", skills)} />
            })}
          </div>
          <div className='border-b-2 w-full text-blue-800/75 mt-4 px-2 '>
              {output?.map((item, index)=> {
                return <span key={index}>{item} , </span>
              })}
        </div>
      </div>
    )
  }
  if(step === STEPS.RATING){
    body=(
      <div className='py-8 px-4 overflow-y-auto flex flex-col items-center gap-4'>
          <h4 className=' text-blue-800/50 text-2xl border-b-2  px-4'>Your ratings</h4>
          <RatingInput value={rating} onClick={(rating)=> setCustomValue("rating", rating)} />
      </div>
    )
  }
  if(step === STEPS.PRICE){
    body=(
      <div className='py-8 px-4 overflow-y-auto flex flex-col items-center gap-4'>
          <h4 className=' text-blue-800/50 text-2xl border-b-2  px-4'>Your Hourly Price</h4>
          <div className='flex flex-row gap-3 items-center'>
              <Input id="price" placeholder='' type="number" register={register} required errors={errors} />
              <p className='whitespace-nowrap text-blue-600/75'>/per hour</p>
          </div>
      </div>
    )
  }
  return (
    <Modal 
      title='I will Choose for You!'
      body={body}
      open={addNewModal.open}
      onClose={addNewModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secAction={step== STEPS.CATEGORY ?undefined:onBack}
      secActionLabel={secActionLabel}
      disabled={loading}
      />
  )
}

// with over 10 years of childcare experience, I believe in loving and support approach.
//I will take care of your house like it's my own. I am detail-oriented! And I can cover simple daily cooking too
// I handle various repair, maintenance, and improvement tasks around homes and businesses with skills such as plumbing expertise, electrical knowledge, and proficiency in carpentry.
//Provided one-on-one and small group instruction to high school students in mathematics, resulting in an average improvement of 2 letter grades for
//As a private chauffeur, i  safely transport either cargo or passengers from one location to another. I follow traffic laws and correctly route , ensuring that there is enough gas in the tank at all times for their destination.
//Consulting with clients to explore their needs, food preferences, allergies and dietary restrictions. Developing recipes for appetizers, salads, soups, entrées, sides and desserts. Creating menus with meal options clients can select from. Sourcing high-quality ingredients.