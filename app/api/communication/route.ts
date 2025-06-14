import { getCurrentUser } from "@/app/action/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export const POST = async(request: Request) : Promise<NextResponse>=>{
    const curUser = await getCurrentUser()
    if(!curUser){
         return NextResponse.json({ error: 'cant get current user' }, { status: 500 })
    }
    const resp = await request.json()
    const {id, topic} = resp
    const newCommu = await prisma.communication.create({
        data:{
            id, topic, userEmail:curUser.email
        }
    })
    return NextResponse.json(newCommu)
}