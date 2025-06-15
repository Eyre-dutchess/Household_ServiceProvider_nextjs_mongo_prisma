import React from 'react'
import { ClientOnly } from '../component/ClientOnly'
import { Container } from '../component/Container'
import { Navbg } from '../component/navbar/Navbg'
import { PolicySec } from './PolicySec'

export default function PolicyPage() {
  return (
    <ClientOnly>
        <Container>
            <Navbg />
            <PolicySec />
        </Container>
    </ClientOnly>
  )
}
