import React, { Fragment } from 'react'
import { useContext } from 'react'
import { ClientsContext, ClientsProvider } from './clients/client._model.context'
import { ProjectsContext, ProjectsProvider } from './projects/project._model.context'
import { TimesContext, TimesProvider } from './times/time._model.context'

export const ModelProviders=({children})=>{
  return(
    <ClientsProvider>
      <ProjectsProvider>
        <TimesProvider>
          <PrepareModels>
          {children}
          </PrepareModels>
        </TimesProvider>
      </ProjectsProvider>
    </ClientsProvider>
  )
}

const PrepareModels=({children})=>{
  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)
  const sheet = useContext(TimesContext)

  book.prepareCards(list, sheet)
  list.prepareProjects(book, sheet)

  return(
    <Fragment>
      {children}
    </Fragment>
  )
}