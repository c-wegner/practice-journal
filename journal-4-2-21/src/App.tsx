import React from 'react';
import { useContext } from 'react';
import { Fragment } from 'react';
import { GlobalStyle } from "./globals/styles";
<<<<<<< HEAD
import { Main } from './views/main.view';
=======
import { ClientsContext, ClientsProvider, ProjectsProvider, TimeProvider } from './models';

>>>>>>> 3e00e064304a93e4b7f4a7273f9d446e29f788a1


function App() {
  return (
<<<<<<< HEAD
    <div>
      <GlobalStyle />
      <Main/>
    </div>
=======
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
>>>>>>> 3e00e064304a93e4b7f4a7273f9d446e29f788a1
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