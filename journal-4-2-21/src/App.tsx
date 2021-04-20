import React, { Fragment } from 'react'
import { useContext } from 'react';
import { TextBox } from './controls';
import { FormProvider } from './controls/forms.context';
import { GlobalStyle } from "./globals/styles";
import { Main } from './views/main.router';
import { ClientsContext, ClientsProvider } from './_models/clients/client._model.context';
import { ModelProviders } from './_models/models.providers';
import { ProjectsContext, ProjectsProvider } from './_models/projects/project._model.context';
import { TimesProvider, TimesContext } from "./_models/times/time._model.context";



function App() {
  
  return (
    <Fragment>
      <ModelProviders>

        <Main />
      </ModelProviders>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
