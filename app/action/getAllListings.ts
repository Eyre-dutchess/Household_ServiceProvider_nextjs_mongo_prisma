import prisma from "@/app/libs/prismadb"

export interface ISearchParams {
    category?: string
    gender?: string
    startAge?: number
    endAge?: number
    priceOrder?: string
    ratingOrder?: string
}

export const getAllListings = async(params: Promise<ISearchParams>) =>{
    try {
        const {category, gender,  startAge, endAge , priceOrder, ratingOrder} = await params
        let query: any = {}
        let orderBy: any={} 
        if(category){
            query.category = category
        }
        if(gender){
            query.gender = gender
        }
        
        if(startAge && endAge){
             query.age= {
                    gte: +startAge,
                    lte: +endAge
                
            }}
        if(priceOrder){
                orderBy={
                    price:priceOrder.toString()
                }  
        }else if(ratingOrder){
            orderBy={
                rating:ratingOrder.toString()
            }
        }else{
            orderBy = {
                createdAt: "asc"
            }
        }
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy
        })

        const SafeListings = listings.map((listing)=>({
            ...listing, 
            createdAt: listing.createdAt.toISOString()
        }))
        return SafeListings
    } catch (error:any) {
        throw new Error(error)
    }
}