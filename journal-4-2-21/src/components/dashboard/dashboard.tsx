import React, { useContext, useState } from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { ClientForm } from '../../forms/client.forms';
import { Client, ClientsContext, Project, ProjectsContext } from '../../models';
import { ClientCard } from '../card/client.card';
import { ProjectCard } from '../card/project.card';
import * as Icons from '../icons'
import { Panel } from '../panels/panel';
import ChangeLaneTypeImg from './changelanetype.png';

const Stage = styled.div`
  display: flex;
`;

const LaneStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  flex-grow: 1;
  margin: 10px;
`;

const LandHeadStyle = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  font-size: 1.4rem;
`;

const LaneHeadingStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
`

const ChangeLaneIconStyle = styled.img `
  height: 1.0rem;
  margin-left: 10px;
  cursor: pointer;
`

export const Dashboard = () => {
  const [showPanel, setShowPanel] = useState('')
  const [currentClient, setCurrentClient] = useState(new Client())
  const [currentProject, setCurrentProject] = useState(new Project())

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)

  const handleSelectClient = (client) => {
    if (currentClient.id === client.id) {
      setCurrentClient(new Client())
      setCurrentProject(new Project())
    } else {
      setCurrentClient(client)
    }
  }

  const handleSelectProject = (project) => {
    if (currentProject.id === project.id) {
      setCurrentProject(new Project())
    } else {
      setCurrentProject(project)
      if (project.clientId !== currentClient.id) {
        setCurrentClient(book.clients[project.clientId])
      }
    }
  }

  return (
    <Stage>
      <ClientLane handleSelectClient={handleSelectClient} currentClient={currentClient} />
      <Lane id='@Wegner Law PLLC'>
          {
            list.getProjectByLane('@Wegner Law PLLC').map(x=><ProjectCard project={x} key={x.id} onSelectProject={handleSelectProject} currentClient={currentClient} currentProject={currentProject}/>)
          }
      </Lane>
      <Lane id='@Client'>
      {
            list.getProjectByLane('@Client').map(x=><ProjectCard project={x} key={x.id} onSelectProject={handleSelectProject} currentClient={currentClient} currentProject={currentProject}/>)
          }
      </Lane>

      <Lane id='@3rd party'>
      {
            list.getProjectByLane('@3rd party').map(x=><ProjectCard project={x} key={x.id} onSelectProject={handleSelectProject} currentClient={currentClient} currentProject={currentProject}/>)
          }
      </Lane>
    </Stage>
  )
}

const Lane = ({ id = '', children }) => {
  return (
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

const ClientLane = ({  handleSelectClient, currentClient }) => {
  const [showingClientType, setShowingClientType] = useState('Active clients')
  const [showPanel, setShowPanel] = useState('')

  const book = useContext(ClientsContext)

  const handleChangeClientTypeShowing=()=>{
    let temp = '';
    switch(showingClientType){
      case 'Active clients': 
        temp = 'Current clients'
        break
      case 'Current clients':
        temp = 'All clients'
        break
      case 'All clients':
        temp = 'Active clients'
        break
        default: 
          temp = 'Active clients'
    }

    setShowingClientType(temp)
    }


  const handleAddClient = () => {
    setShowPanel('Add client')
  }

  return (
    <Fragment>
    <LaneStyle>
      <LandHeadStyle>
        <LaneHeadingStyle>
          {showingClientType}
    <ChangeLaneIconStyle src={ChangeLaneTypeImg} onClick={()=>handleChangeClientTypeShowing()}/>
      </LaneHeadingStyle>
        <Icons.PersonPlus display size='1.3rem' onClick={() => handleAddClient()} />
      </LandHeadStyle>
      {
          book.filterClientsForBoard(showingClientType).map(x => <ClientCard client={x} key={x.id} onSelectClient={handleSelectClient} currentClient={currentClient} />)
        }
    </LaneStyle>
    <Panel id='Add client' current={showPanel} onExit={()=>setShowPanel('')}>
      <ClientForm obj={new Client()}/>
    </Panel>
    </Fragment>
  )
}