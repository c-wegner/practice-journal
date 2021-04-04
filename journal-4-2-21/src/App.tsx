import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import { Dialog } from './components/dialog/dialog';
import { GlobalStyle } from "./globals/styles";
import { ClientsContext, ClientsProvider, ProjectsProvider, TimeProvider } from './models';



function App() {
  const [dTest, setDTest] = useState('')
  return (
    <Fragment>
      <ClientsProvider>
        <ProjectsProvider>
          <TimeProvider>
            <GlobalStyle />
            <span onClick={()=>setDTest('Test')}>
      Testing
      </span>
      <TestDB/>
      </TimeProvider>
        </ProjectsProvider>
      </ClientsProvider>
      <Dialog id='Test' onExit={()=>setDTest('')} current={dTest}>
        Tada
      </Dialog>
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