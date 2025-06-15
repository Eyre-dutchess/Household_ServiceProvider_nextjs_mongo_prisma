
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request: Request) :Promise<NextResponse> =>{
    try {
        const resp = await request.json()

        const {name, age, gender, category, description, skills, imgSrc, rating, price} = resp
        const result = await prisma.listing.create({
            data:{
                name, age:parseInt(age),  category, description, skills, imgSrc, 
                rating: parseInt(rating), 
                price: parseInt(price),
                gender: gender.label,
            }
    })
    return NextResponse.json(result)
    } catch (error: any) {
       return  NextResponse.json({ error: 'something went wrong' }, { status: 500 })
    }
    
}