import React from 'react'

import { getListingById } from '@/app/action/getListingById'
import { ClientOnly } from '@/app/component/ClientOnly'
import { Container } from '@/app/component/Container'
import { Navbg } from '@/app/component/navbar/Navbg'
import { ListingPageHeader } from '@/app/component/listings/ListingPageHeader'
import { ListingPageContent } from '@/app/component/listings/ListingPageContent'
import { EmptyState } from '@/app/component/EmptyState'

interface IParams{
  listingId: string
}
export default async function ListingSinglePage(
  {params}: {params:Promise<IParams>}
) {
  const listing = await getListingById(params) 
  
  if(!listing){
    return (
      <ClientOnly>
          <EmptyState title="Can't find listing" showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
          <Navbg />
          <Container>
            <div className='flex flex-col gap-[calc(1em_+_0.5vw)] py-12 px-4 xl:px-[5vw]'>
              <ListingPageHeader listing={listing} />
              {/* content */}
              <ListingPageContent listing={listing} />       
            </div>  
          </Container>
    </ClientOnly>
  )
}
