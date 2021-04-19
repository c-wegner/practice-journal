import React, {Fragment} from 'react'
import {  DataProviders } from './data';
import { GlobalStyle } from "./globals/styles";

import {useContext} from 'react'
import { CardProviders } from './models/card.providers.context';
import { ClientCardsContext } from './models/client.card.model';
import { ProjectCardsContext } from './models/project.card.model';
import { TimeCardsContext } from './models/time.card.model';


const TestRig=()=>{
  const clientBook = useContext(ClientCardsContext)
  const projectList = useContext(ProjectCardsContext)
  const timeSheet = useContext(TimeCardsContext)


  let temp = 'Tuba Tom took Tanya to Toledo today to talk to Teddy T. the third'

  if(clientBook.clients[0]!==undefined){
    temp = clientBook.clients[0].currentProjects.toString()
  }

  if(projectList.projects[0]!==undefined){
    temp = temp + ' ||||| '+ projectList.projects[0].clientDisplay
  }

  if(timeSheet.entries[0]!==undefined){
    temp = temp + ' |||  ' + timeSheet.entries[0].clientDisplay
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
