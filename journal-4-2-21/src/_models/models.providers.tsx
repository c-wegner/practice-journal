import React from 'react'
import { ClientsProvider } from './clients/client._model.context'
import { ProjectsProvider } from './projects/project._model.context'
import { TimesProvider } from './times/time._model.context'

export const ModelProviders=({children})=>{
  return(
    <ClientsProvider>
      <ProjectsProvider>
        <TimesProvider>
          {children}
        </TimesProvider>
      </ProjectsProvider>
    </ClientsProvider>
  )
}