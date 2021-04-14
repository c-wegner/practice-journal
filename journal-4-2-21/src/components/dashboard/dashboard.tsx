import React, { useContext, useState } from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { ClientForm } from '../../forms/client.forms';
import { Client, ClientsContext, Project, ProjectsContext } from '../../models';
import { ClientCard } from '../card/client.card';
import { ProjectCard } from '../card/project.card';
import * as Icons from '../icons'
import { Panel } from '../panels/panel';

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
      <ClientLane>
        {
          book.getClientsForBoard().map(x => <ClientCard client={x} key={x.id} onSelectClient={handleSelectClient} currentClient={currentClient} />)
        }
      </ClientLane>
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

const ClientLane = ({ children }) => {
  const [showPanel, setShowPanel] = useState('')

  const handleAddClient = () => {
    setShowPanel('Add client')
  }

  return (
    <Fragment>
    <LaneStyle>
      <LandHeadStyle>
        <LaneHeadingStyle>
          Current clients

      </LaneHeadingStyle>
        <Icons.PersonPlus display size='1.3rem' onClick={() => handleAddClient()} />
      </LandHeadStyle>
      {children}
    </LaneStyle>
    <Panel id='Add client' current={showPanel} onExit={()=>setShowPanel('')}>
      <ClientForm obj={new Client()}/>
    </Panel>
    </Fragment>
  )
}