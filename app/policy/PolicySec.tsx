"use client"

import React, {  useEffect } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { Textarea } from '@heroui/input'

import { Button } from '../component/modal/Button'
import { Footer } from '../component/Footer'

export const PolicySec = () => {
    const router = useRouter()
    const params = useSearchParams()
    const label = params?.get("label") as string
    useEffect(()=>{
        const elem = document.getElementById(label)
        elem?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [router])

    const handleQuestion = () =>{
        //questions added to your user account
        //modal pop out
    }
  return (
    <div className='pt-16'>
        {/* service section */}
        <div className='policy' id="service">
            <h3>About Our Service</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, odit quisquam molestiae incidunt perspiciatis exercitationem quam, fugit earum voluptatum in obcaecati ipsam harum, itaque inventore illum. Consequatur similique aperiam autem sunt cum, itaque ducimus veniam quia ex dolorem numquam rem accusamus iusto magnam harum deserunt eos officiis, neque hic illo repellat minus! Praesentium commodi suscipit sit fugit voluptate autem inventore ut ullam iste in pariatur molestias dolorum enim molestiae nostrum fugiat magnam porro quis, cumque, ipsum hic sint laboriosam, nihil aut. Nam dolore dolorum, unde fugiat voluptatem ab labore sit rerum eligendi consequatur, error fuga corrupti, enim blanditiis vitae laudantium?</p>
            <Button label="Check out now" icon={FaLongArrowAltRight} defauBtn onClick={()=> router.push("/listings")}/>
        </div>
        <hr />
        {/* booking sec */}
        <div className='policy' id="booking">
            <h3>About Booking</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, odit quisquam molestiae incidunt perspiciatis exercitationem quam, fugit earum voluptatum in obcaecati ipsam harum, itaque inventore illum. Consequatur similique aperiam autem sunt cum, itaque ducimus veniam quia ex dolorem numquam rem accusamus iusto magnam harum deserunt eos officiis, neque hic illo repellat minus! Praesentium commodi suscipit sit fugit voluptate autem inventore ut ullam iste in pariatur molestias dolorum enim molestiae nostrum fugiat magnam porro quis, cumque, ipsum hic sint laboriosam, nihil aut. Nam dolore dolorum, unde fugiat voluptatem ab labore sit rerum eligendi consequatur, error fuga corrupti, enim blanditiis vitae laudantium?</p>
            <Button label="Check out now" icon={FaLongArrowAltRight} defauBtn onClick={()=> router.push("/listings")}/>
        </div >
        <hr />
        {/* cancel sec */}
        <div className='policy' id="cancellation">
            <h3>About Cancellation</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, odit quisquam molestiae incidunt perspiciatis exercitationem quam, fugit earum voluptatum in obcaecati ipsam harum, itaque inventore illum. Consequatur similique aperiam autem sunt cum, itaque ducimus veniam quia ex dolorem numquam rem accusamus iusto magnam harum deserunt eos officiis, neque hic illo repellat minus! Praesentium commodi suscipit sit fugit voluptate autem inventore ut ullam iste in pariatur molestias dolorum enim molestiae nostrum fugiat magnam porro quis, cumque, ipsum hic sint laboriosam, nihil aut. Nam dolore dolorum, unde fugiat voluptatem ab labore sit rerum eligendi consequatur, error fuga corrupti, enim blanditiis vitae laudantium?</p>
        </div>
        <hr />
        {/* question */}
        <div className=' question-policy max-w-[700px] mx-auto' id="question">
            <h3>More questions</h3>
            <form className='relative pb-16'>
                <Textarea name="question-topic" isRequired variant={'faded'} placeholder="Enter your questions"
                            classNames={{ 
                                base:"rounded-lg  border-2 border-blue-200",
                                input:"text-blue-800/75 p-4 resize-y outline-none focus-within:placeholder:opacity-25",
                                errorMessage:"italic  text-orange-400/50 pl-4"
                            }} 
                            isClearable
                            minRows={10}
                            errorMessage="The question should be at least 255 characters long."
                            isInvalid={true}
                            onValueChange={()=>{}}
                    />
                <div className="absolute w-1/2 -bottom-2 left-0 lg:left-[25%]">
                    <Button onClick={handleQuestion} label="Submit" defauBtn type="submit"/>
                </div>
            </form>
        </div>

        <Footer />
    </div>
  )
}
