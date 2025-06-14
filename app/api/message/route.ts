import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async(request: Request) :Promise<NextResponse> =>{
    const resp = await request.json()
    const {commuId, message} = resp
    const result = await prisma.message.create({
        data:{
            content:message,
            communicationId:commuId
        }
    })
    return NextResponse.json(result)
}