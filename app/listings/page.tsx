import React from 'react'

import { getAllListings, ISearchParams } from '../action/getAllListings'
import { ClientOnly } from '../component/ClientOnly'
import { Container } from '../component/Container'
import { ListingClient } from '../component/listings/ListingClient'
import { EmptyState } from '../component/EmptyState'
import { getCurrentUser } from '../action/getCurrentUser'
import { Navbg } from '../component/navbar/Navbg'

export default async function AllServicePage({params}: {params: Promise<ISearchParams>}) {
  const listings = await getAllListings(params)
  const currentUser = await getCurrentUser()

  if(!listings){
    <ClientOnly>
            <EmptyState title="No match! reset Your filters" showReset/>
    </ClientOnly>
  }
  return (
    <ClientOnly>
          <Navbg />
          <Container>
              <div className="fixed top-0 left-0 w-screen h-[30vh]  z-0  bg-gradient-to-b from-orange-600/75 via-blue-600/75 to-blue-100/5"></div>
              <ListingClient  curList={listings} currentUser = {currentUser}/>
          </Container>
          
    </ClientOnly>
  )
}
