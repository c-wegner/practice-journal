import React from 'react'
import { ClientCardProvider } from './client.card.model'
import { ProjectCardsProvider } from './project.card.model'
import { TimeCardsProvider } from './time.card.model'

export const CardProviders = ({children})=>{
  return(
    <ClientCardProvider>
      <ProjectCardsProvider>
        <TimeCardsProvider>
      {children}
      </TimeCardsProvider>
      </ProjectCardsProvider>
    </ClientCardProvider>
  )
}