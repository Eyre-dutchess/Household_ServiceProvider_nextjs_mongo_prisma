
import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions:AuthOptions ={
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"email", type:"text"},
                password:{label:"password", type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password ){
                    throw new Error("your sign in infor is wrong")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.hashedPassword){
                    throw new Error("can't find user with this email")
                }
                
                const isCorrectPass = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if(!isCorrectPass){
                    throw new Error("wrong password")
                }
                return user
            }
        })
    ],
    pages:{
        signIn:"/"
    },
    session:{
        strategy:"jwt"
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET 
}

export default NextAuth(authOptions)
