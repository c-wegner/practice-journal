import React, { Fragment } from 'react'
import { useContext } from 'react';
import { GlobalStyle } from "./globals/styles";
import { ClientsContext, ClientsProvider } from './_models/clients/client._model.context';
import { ModelProviders } from './_models/models.providers';
import { ProjectsContext, ProjectsProvider } from './_models/projects/project._model.context';
import { TimesProvider, TimesContext } from "./_models/times/time._model.context";


const TestRig = () => {
  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)
  const sheet = useContext(TimesContext)

  let temp = ''

  if (book.clients[0] !== undefined) {
    temp += '|||' + book.clients[0].display
  }

  if (list.projects[0] !== undefined) {
    temp += '|||' + list.projects[0].display
  }

  if (sheet.times[0] !== undefined) {
    temp += '|T|' + sheet.times[0].description
  }

  return (
    <Fragment>
      {temp}
    </Fragment>
  )
}


function App() {

  return (
    <Fragment>
      <ModelProviders>
        <TestRig/> cc
      </ModelProviders>
      <GlobalStyle />

    </Fragment>
  );
}

export default App;
