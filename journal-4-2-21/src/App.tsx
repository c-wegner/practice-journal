import React from 'react';
import { useContext } from 'react';
import { Fragment } from 'react';
import { GlobalStyle } from "./globals/styles";
import { ClientsContext, ClientsProvider, ProjectsProvider, TimeProvider } from './models';
import {Main} from './views/main.view';



function App() {
  return (
    <Fragment>
      <ClientsProvider>
        <ProjectsProvider>
          <TimeProvider>
            <GlobalStyle />
        <Main />
      <TestDB/>
      </TimeProvider>
        </ProjectsProvider>
      </ClientsProvider>
    </Fragment>
  );
}

export default App;


const TestDB = ()=>{
  const book = useContext(ClientsContext)

  return(
    <Fragment>
    {book._clients.map(x=>x.display)}
    </Fragment>
  )
}