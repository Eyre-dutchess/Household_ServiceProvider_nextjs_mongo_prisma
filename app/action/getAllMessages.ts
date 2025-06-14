"use server"

import prisma from "@/app/libs/prismadb"

interface IParams{
    commuId?: string
}
export const getAllMessages = async (params: Promise<IParams>) =>{
    try {
        const {commuId} = await params;
        const messages = await prisma.message.findMany({
            where:{
                communicationId: commuId
            }
        })
        if(!messages){
            return null
        }
        const safeMessages = messages.map((mes)=>{
            return {
                ...mes, 
                createdAt: mes.createdAt.toISOString()
            }
        })
        return safeMessages
    } catch (error: any) {
        throw new Error(error)
    }

}

export const createNewMessage = async(formData:FormData, commuId: string)=>{
    const messageContent = formData.get("message") as string
    await prisma.message.create({
        data:{
            content:messageContent,
            communicationId:commuId
        }
    })
   
}