import { getCurrentUser } from "@/app/action/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams{
    listingId?: string
}
export const POST = async (request: Request, 
    {params}:{params: Promise<IParams>}
) :Promise<NextResponse>  =>{
    const curUser = await getCurrentUser()
    if(!curUser){
       return NextResponse.json({ error: 'cant get current user' }, { status: 500 })
    };
    const {listingId} = await params
    if(!listingId || typeof listingId !=="string"){
       return NextResponse.json({ error: 'invalid ID' }, { status: 500 })
    }
    let favIds = [...(curUser.favoriteIds || [])]
    favIds.push(listingId)
    const user = await prisma.user.update({
        where:{
            id: curUser.id
        },
        data:{
            favoriteIds: favIds
        }
    })
    return NextResponse.json(user)
}

export const DELETE = async(request: Request, 
    {params}:{params:Promise<IParams>}
) :Promise<NextResponse>  =>{
    const curUser = await getCurrentUser()
    if(!curUser){
        return NextResponse.json({ error: 'cant get current user' }, { status: 500 })
    };
    const {listingId} = await params
    if(!listingId || typeof listingId !=="string"){
       return NextResponse.json({ error: 'invalid ID' }, { status: 500 })
    }
    let favIds = [...(curUser.favoriteIds || [])]
    favIds = favIds.filter((id)=> id !== listingId)

    const user = await prisma.user.update({
        where:{
            id: curUser.id
        },
        data:{
            favoriteIds: favIds
        }
    })
    return NextResponse.json(user)
}