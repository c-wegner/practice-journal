import React, { useState, useContext, Fragment } from 'react';
import styled from 'styled-components'
import { ClientCard } from '../../components/cards/client.card';
import { ProjectCard } from '../../components/cards/project.card';
import { Panel } from '../../components/panel/panels';
import { Client, ClientsContext, Project, ProjectsContext } from '../../_models';
import { ClientLane } from './client.lane'

const FrameStyle = styled.div `
display: flex;
flex-direction: column;
`

const Stage = styled.div`
  display: flex;
`

export const LaneStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 25%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 17px 7px 17px;
  align-items: center;
`

export const Heading = styled.div`
  font-size: 1.7rem;
`

const AltLaneSelectStyle = styled.div `
  display: flex;
  justify-content: flex-end;
`;

const AltLaneSelecterStyle = styled.div `
  color: blue;
  cursor: pointer;
  margin: 0 10px 10px 10px;
`

const AltLanePanelStyle = styled.div`
  display: flex;
`

export const Dashboard = ({ }) => {
  const [currentClient, setCurrentClient] = useState(new Client())
  const [currentProject, setCurrentProject] = useState(new Project())
  const [draggedProjectCard, setDraggedProjectCard] = useState(new Project())
  const [showPanel, setShowPanel] = useState('')
  const book = useContext(ClientsContext)

  const handleSelectClient = (client: Client) => {
    if (client.id === currentClient.id) {
      setCurrentClient(new Client())
    } else {
      setCurrentClient(client)
    }
  }

  const handleSelectProject = (project: Project) => {
    if (project.id === currentProject.id) {
      setCurrentProject(new Project())
    } else {
      setCurrentProject(new Project())
      if (currentProject.clientId !== currentClient.id) {
        setCurrentClient(book.getClient(project.clientId))
      }
    }
  }

  const handleOnDragStart = (project: Project, e) => {

    setDraggedProjectCard(project)

  }

  const handleOnDrageEnter = (e) => {
    e.preventDefault()

  }

  const handleOnDragDrop = (lane) => {
    draggedProjectCard.update('lane', lane)
  }


  return (
    <Fragment>
      <FrameStyle>

      <Stage>
        <ClientLane currentClient={currentClient} handleSelectClient={handleSelectClient} />

        <FirmLane id='@Wegner Law PLLC' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject} onDragStart={handleOnDragStart} onDragEnter={handleOnDrageEnter} onDrop={handleOnDragDrop} />
        <ProjectLane id='@Client' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject} onDragStart={handleOnDragStart} onDragEnter={handleOnDrageEnter} onDrop={handleOnDragDrop} />
        <ProjectLane id='@3rd party' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject} onDragStart={handleOnDragStart} onDragEnter={handleOnDrageEnter} onDrop={handleOnDragDrop} />
      </Stage>
      <AltLaneSelectStyle>
          <AltLaneSelecterStyle onClick={()=>setShowPanel('Alt lanes')}>
            Alt lanes
          </AltLaneSelecterStyle>
        </AltLaneSelectStyle>
      </FrameStyle>
      <Panel id='Alt lanes' current={showPanel} onExit={()=>setShowPanel('')}>
      <AltLanePanelStyle>
        <ProjectLane id='On hold' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject} onDragStart={handleOnDragStart} onDragEnter={handleOnDrageEnter} onDrop={handleOnDragDrop} />
        <ProjectLane id='Winding down' currentClient={currentClient} currentProject={currentProject} onSelectProject={handleSelectProject} onDragStart={handleOnDragStart} onDragEnter={handleOnDrageEnter} onDrop={handleOnDragDrop} />
        </AltLanePanelStyle>
      </Panel>
    </Fragment>
  )
}

export const ProjectLane = ({
  id = '',
  currentClient,
  currentProject,
  onSelectProject,
  onDragStart,
  onDragEnter,
  onDrop
}) => {
  const list = useContext(ProjectsContext)


  const handleOnDrop = (lane) => {
    onDrop(lane)
  }

  return (
    <LaneStyle onDragEnter={(e) => onDragEnter(e)} onDrop={() => handleOnDrop(id)} onDragOver={e => e.preventDefault()}>
      <Header>
        <Heading>
          {id}
        </Heading>

      </Header>
      {
        list.getActiveProjects(id).map(x => (
          <ProjectCard project={x} currentProject={currentProject} currentClient={currentClient} onProjectSelect={onSelectProject} key={x.id} onDragStart={(e) => onDragStart(x, e)} currentLane={id} />
        ))
      }

    </LaneStyle>
  )
}

const FirmLane = ({
  id = '',
  currentClient,
  currentProject,
  onSelectProject,
  onDragStart,
  onDragEnter,
  onDrop
}) => {
  const list = useContext(ProjectsContext)


  const handleOnDrop = (lane) => {
    onDrop(lane)
  }

  const [cwegner, cthomson] = getProjectAssignments(list.getActiveProjects('@Wegner Law PLLC'))

  return (
    <LaneStyle onDragEnter={(e) => onDragEnter(e)} onDrop={() => handleOnDrop(id)} onDragOver={e => e.preventDefault()}>
      <Header>
        <Heading>
          {id}
        </Heading>

      </Header>
      {
        cwegner.map(x => (
          <ProjectCard project={x} currentProject={currentProject} currentClient={currentClient} onProjectSelect={onSelectProject} key={x.id} onDragStart={(e) => onDragStart(x, e)} currentLane={id} />
        ))
      }
      <hr />
      {
        cthomson.map(x => (
          <ProjectCard project={x} currentProject={currentProject} currentClient={currentClient} onProjectSelect={onSelectProject} key={x.id} onDragStart={(e) => onDragStart(x, e)} currentLane={id} />
        ))
      }

    </LaneStyle>
  )
}


function getProjectAssignments(projects): [Project[], Project[]] {
  let cwegner = []
  let cthomson = []
  const l = projects.length
  for (let i = 0; i < l; i++) {
    const p: Project = projects[i]
    if (p.assignedTo === 'cthomson') {
      cthomson.push(p)
    } else {
      cwegner.push(p)
    }
  }

  return [cwegner, cthomson]
}