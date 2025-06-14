import {  Communication, Listing, Message, User } from "../generated/prisma";

export type SafeUser = Omit<
    User,
    "emailVerified" | "createdAt" | "updatedAt"
> &{
    emailVerified: string | null,
    createdAt: string,
    updatedAt: string
}
export type SafeListing= Omit<
   Listing,
   "createdAt" 
>&{
    createdAt: string
}
export type SafeCommunication = Omit<
   Communication, 
   "createdAt" | "updatedAt"
>&{
    createdAt: string,
    updatedAt: string
}

export type SafeMessage = Omit<
   Message, 
   "createdAt"
>&{
    createdAt: string,
}

