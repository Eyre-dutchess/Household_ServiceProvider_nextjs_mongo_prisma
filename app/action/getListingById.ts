import prisma from "@/app/libs/prismadb"

interface IParams{
    listingId?: string
}

export const getListingById = async(
    params: Promise<IParams>
)=>{
    try {
        const {listingId} = await params
       
        const listing = await prisma.listing.findUnique({
            where:{
                id: listingId
            }
        })
        if(!listing){
            return null
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }
    } catch (error: any) {
        throw new Error(error)
    }
}