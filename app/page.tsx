import { Suspense } from "react";

import { getAllListings, ISearchParams } from "./action/getAllListings";
import { getCurrentUser } from "./action/getCurrentUser";
import { ClientOnly } from "./component/ClientOnly";
import { Container } from "./component/Container";
import { EmptyState } from "./component/EmptyState";
import { Footer } from "./component/Footer";
import { HeaderSec } from "./component/HeaderSec";
import { MainSec } from "./component/MainSec";


export default async function Home({params}: {params: Promise<ISearchParams>}) {
  const listings = await getAllListings(params)
  const currentUser = await getCurrentUser()
  
  if(listings.length < 1){
      <ClientOnly>
        <EmptyState title="No match! reset Your filters" showReset/>
      </ClientOnly>
  }

  return (
    <ClientOnly>
      <div className="fixed top-0 left-0 w-screen h-[50vh]  z-0  bg-gradient-to-b from-orange-600/75 via-blue-600/75 to-blue-100/5"></div>
      <Container>
          <HeaderSec />
          <Suspense fallback={<Loading />}>
            <MainSec listings={listings} currentUser={currentUser}/>
          </Suspense>
          <Footer />
      </Container>
    </ClientOnly>
  );
}
