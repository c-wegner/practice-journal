import React from 'react';
import { useContext } from 'react';
import { Fragment } from 'react';
import { GlobalStyle } from "./globals/styles";
import { ClientsContext, ClientsProvider, ProjectsProvider, TimeProvider } from './models';



function App() {
  return (
    <Fragment>
      <ClientsProvider>
        <ProjectsProvider>
          <TimeProvider>
            <GlobalStyle />
      Testing
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