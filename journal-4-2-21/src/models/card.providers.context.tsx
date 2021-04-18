import React from 'react'
import { ClientCardProvider } from './client.card.model'

export const CardProviders = ({children})=>{
  return(
    <ClientCardProvider>
      {children}
    </ClientCardProvider>
  )
}