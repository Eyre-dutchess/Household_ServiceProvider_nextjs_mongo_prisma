
import React, { useCallback, useMemo } from 'react'
import { SafeUser } from '../type'
import { useLoginModal } from './useLoginModal'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface FavProps{
    listingId: string
    curUser?: SafeUser | null
}

export const useFavBtn=({
    listingId, curUser
}: FavProps)=> {
    
    const router = useRouter()
    const loginModal = useLoginModal()
    const isFaved = useMemo(()=>{
        const favList = curUser?.favoriteIds || []
        return favList.includes(listingId)
    }, [curUser, listingId])

    const handleFav = useCallback(async()=>{
        if(!curUser){
            return loginModal.onOpen()
        }
        try {
            let request: any
            if(isFaved){
                request = () => axios.delete(`/api/favorites/${listingId}`)
                toast.success("removed from your Favorites")
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`)
                toast.success("added to your Favorites")
            }
            await request()
            router.refresh()
            
        } catch (error) {
            toast.error("can't add to your list")
        }
    }, [curUser,loginModal,  listingId, router, isFaved])
    
  return {handleFav, isFaved}
}
