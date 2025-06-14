import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

export const getFavorites = async () =>{
    const curUser = await getCurrentUser()
    if(!curUser)return ;
    const favList = await prisma.listing.findMany({
            where:{
                id: {
                    in: curUser.favoriteIds
                }
            }
        })
    if(!favList)return;
    const list = favList.map((lst)=>{
        return {
            ...lst,
            createdAt: lst.createdAt.toISOString()
        }
    })
    return list;
}