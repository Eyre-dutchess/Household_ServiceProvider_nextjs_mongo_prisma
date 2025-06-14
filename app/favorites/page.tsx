import React from 'react'
import { getCurrentUser } from '../action/getCurrentUser'
import { SafeUser } from '../type'

import { EmptyState } from '../component/EmptyState'
import { ClientOnly } from '../component/ClientOnly'
import { Container } from '../component/Container'
import { ListingCard } from '../component/listings/ListingCard'
import { getFavorites } from '../action/getFavorites'
import { Navbg } from '../component/navbar/Navbg'


export default async function FavoritePage() {
    const curUser = await getCurrentUser() as SafeUser
    const favList = await getFavorites()
    
    if(!favList || favList.length<1){
        return (
            <ClientOnly>
                <div className='w-2/3 mx-auto'>
                    <EmptyState title="you dont have any favrites" showReset />
                </div>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <Container>
            <Navbg />
            <div className='relative z-0 pt-8'>
                <h1 className='text-4xl text-white/50 w-full text-center border-b-2 px-4'>My collection</h1>
                <div className='relative py-4 z-20'>
                    {favList.map((fav)=>{
                        return <ListingCard key={fav.id} data={fav} currentUser={curUser}/>
                    })}
                </div>
            </div>
        </Container>
    </ClientOnly>
  )
}
