import prisma from "@/app/libs/prismadb"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

import { getServerSession } from "next-auth/next"

export const getSession = async() =>{
    return await getServerSession(authOptions)
}

export const getCurrentUser = async () =>{
    try {
        const session = await getSession()
        if(!session?.user?.email){
            return null
        }

        const curUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })
        if(!curUser){
            return null
        }
        if(curUser.email =="remo@outlook.com"){
            return {
                ...curUser,
                isAdmin: true,
                emailVerified: curUser.emailVerified?.toISOString() || null,
                createdAt: curUser.createdAt.toISOString(),
                updatedAt: curUser.updatedAt.toISOString()
            }
        }else{
            return {
                ...curUser,
                emailVerified: curUser.emailVerified?.toISOString() || null,
                createdAt: curUser.createdAt.toISOString(),
                updatedAt: curUser.updatedAt.toISOString() 
            }
        }
    } catch (error: any) {
        throw new Error(error)
    }
}