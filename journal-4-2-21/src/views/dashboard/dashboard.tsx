import React, { useState, useContext, Fragment } from 'react';
import styled from 'styled-components'
import { ClientCard } from '../../components/cards/client.card';
import { ProjectCard } from '../../components/cards/project.card';
import { Client, ClientsContext, Project, ProjectsContext } from '../../_models';

const Stage = styled.div`
  display: flex;
`

const LaneStyle = styled.div`
  width: 25%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 14px 7px 3px 10px;
`

const Heading = styled.div `
  font-size: 1.7rem;
`

export const Dashboard = ({ }) => {
  const [currentClient, setCurrentClient] = useState(new Client())
  const [currentProject, setCurrentProject] = useState(new Project())
  const book = useContext(ClientsContext)

  const handleSelectClient = (client: Client) => {
    if (client.id === currentClient.id) {
      setCurrentClient(new Client())
    } else {
      setCurrentClient(client)
    }
  }

  const handleSelectProject=(project: Project)=>{
    if(project.id === currentProject.id){
      setCurrentProject(new Project())
    }else{
      setCurrentProject(new Project())
      if(currentProject.clientId!==currentClient.id){
        setCurrentClient(book.getClient(project.clientId))
      }
    }
  }

  return (
    <Fragment>
      <Stage>
      <ClientLane currentClient={currentClient} handleSelectClient={handleSelectClient}/>

        <ProjectLane id='@Wegner Law PLLC' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject}/>
        <ProjectLane id='@Client' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject}/>
        <ProjectLane id='@3rd party' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject}/>
      </Stage>
    </Fragment>
  )
}

const ProjectLane=({
  id='',
  currentClient,
  currentProject,
  onSelectProject
})=>{
  const list = useContext(ProjectsContext)

  return(
    <LaneStyle>
      <Header>
        <Heading>
          {id}
        </Heading>

      </Header>
      {
          list.getActiveProjects(id).map(x=>(
            <ProjectCard project={x} currentProject={currentProject} currentClient={currentClient} onProjectSelect={onSelectProject}/>
          ))
        }
    </LaneStyle>
  )
}

const ClientLane=({
  currentClient,
  handleSelectClient
})=>{
  const [selectedClient, setSelectedClients] = useState('All clients')
  const book = useContext(ClientsContext)

  return(
    <LaneStyle>
      <Header>
        <Heading>
          {selectedClient}
        </Heading>

      </Header>
      {
            book.clients.map((x)=>(
              <ClientCard client={x} currentClient={currentClient} onClientSelect={handleSelectClient}/>

            ))
          }
    </LaneStyle>
  )
}