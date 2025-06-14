"use server"
import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

interface IParams{
    commuId?: string
}
export const getAllCommus = async () =>{
    const curUser = await getCurrentUser()
    if(!curUser) {
        return null
    }
    try {
        const commus = await prisma.communication.findMany({
            where:{
                userEmail:curUser.email
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        if(!commus){
            return null
        }
        let safeCommus = commus.map((commu)=>{
            return {
                ...commu,
                createdAt:commu.createdAt.toISOString(),
                updatedAt:commu.updatedAt.toISOString()
            }
        })
        return safeCommus
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getCommuById = async(params: Promise<IParams>) =>{
    try {
        const { commuId} = await params;
        const communication = await prisma.communication.findUnique({
            where:{
                id: commuId
            }
        })
        if(!communication){
            return null
        }
            return {
                ...communication,
                createdAt:communication.createdAt.toISOString(),
                updatedAt:communication.updatedAt.toISOString()
            }
        
    } catch (error: any) {
        throw new Error(error)
    }
}

export const delCommunication = async (commuId: string) =>{
    return await prisma.communication.delete({
        where:{
            id: commuId
        }
    })
    
}