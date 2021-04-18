import React, {Fragment} from 'react'
import {  DataProviders } from './data';
import { GlobalStyle } from "./globals/styles";

import {useContext} from 'react'
import { CardProviders } from './models/card.providers.context';
import { ClientCardsContext } from './models/client.card.model';


const TestRig=()=>{
  const clientBook = useContext(ClientCardsContext)

  let temp = 'Tuba Tom took Tanya to Toledo today to talk to Teddy T. the third'

  if(clientBook.clients[0]!==undefined){
    temp = clientBook.clients[0].currentProjects.toString()
  }

  return(
    <Fragment>
      {temp}
    </Fragment>
  )
}


function App() {

  return (
    <Fragment>
      <DataProviders>
        <CardProviders>
          <TestRig/>
        </CardProviders>
      </DataProviders>
      <GlobalStyle/>

    </Fragment>
  );
}

export default App;
