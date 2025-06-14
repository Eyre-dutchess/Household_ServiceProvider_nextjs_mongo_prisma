import { categories, CategoryType } from "../component/mainpage/Categories"
import { SafeListing } from "../type"

export type SafeCatoListing = {
    label:string
    imgSrc: string,
    description:string,
    curListings: SafeListing[]
}
export const getCatoListings = (
    label:string, 
    listings: SafeListing[]) =>
    {
    const curCategory = categories.find((cato)=> cato.label === label) as CategoryType
    return {
        label:curCategory.label,
        imgSrc: curCategory.bgImg,
        description: curCategory.description,
        curListings: listings.filter((listing)=> listing.category === label) 
    }
}
