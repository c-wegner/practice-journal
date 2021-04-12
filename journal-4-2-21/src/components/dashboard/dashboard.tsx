import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import { Client, ClientsContext, Project, ProjectsContext } from '../../models';
import { ClientCard } from '../card/client.card';

const Stage = styled.div `
  display: flex;
`;

const LaneStyle= styled.div `
  display: flex;
  flex-direction: column;
  width: 25%;
  flex-grow: 1;
`; 

const LandHeadStyle = styled.div `
  display: flex;
`;

const LaneHeadingStyle = styled.div `

`

export const Dashboard=()=>{
  const [showPanel, setShowPanel] = useState('')
  const [currentClient, setCurrentClient] = useState(new Client())
  const [currentProject, setCurrentProject] = useState(new Project())

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)

  const handleSelectClient=(client)=>{
    if(currentClient.id === client.id){
      setCurrentClient(new Client())
      setCurrentProject(new Project())
    }else{
      setCurrentClient(client)
    }  
  }

  const handleSelectProject=(project)=>{
    if(currentProject.id === project.id){
      setCurrentProject(new Project())
    }else{
      setCurrentProject(project)
      if(project.clientId!== currentClient.id){
        setCurrentClient(book.clients[project.clientId])
      }
    }
  }

  return(
    <Stage>
      <Lane id='Clients'>
        {
          book._clients.map(x=><ClientCard client={x} key={x.id} onSelectClient={handleSelectClient} currentClient={currentClient} />)
        }
      </Lane>
    </Stage>
  )
}

const Lane= ({id = '', children})=>{
  return(
    <LaneStyle>
      <LandHeadStyle>
        <LaneHeadingStyle>
          {id}
        </LaneHeadingStyle>
      </LandHeadStyle>
      {children}
    </LaneStyle>
  )
}