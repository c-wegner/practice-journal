import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Panel } from '../components/panels/panel'
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main'
import { Dropdown, TextArea, TextBox } from '../controls'
import { FormProvider } from '../controls/forms.context'
import { Col, Row } from '../globals/styles'
import { Client, ClientsContext, Project, ProjectsContext } from '../models'
import { ClientForm } from '../forms/client.forms'
import { ProjectForm } from '../forms/project.forms'
import { useContext } from 'react'
import { ClientCard } from '../components/card/client.card'
import { cpuUsage } from 'node:process'
import { ProjectCard } from '../components/card/project.card'



const BS = styled.div`
  width: 50%;
`


export const Practice = () => {
  const [panelTest, setPanelTest] = useState('Hi')
  const [currentClient, setCurrentClient] = useState(new Client())
  const [currentProject, setCurrentProject] = useState(new Project())

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)

  const handleClientSelect=(client)=>{
    if(currentClient.id === client.id){
      setCurrentClient(new Client())
      setCurrentProject(new Project())
    }else{
      setCurrentClient(client)
    }
  }

  const handleProjectSelect=(project)=>{
    if(currentProject.id === project.id){
      setCurrentProject(new Project())
    }else{
      setCurrentProject(project)
      if(project.clientId!== currentClient.id){
        setCurrentClient(book.clients[project.clientId])
      }
    }
  }

  return (
<Fragment>
  <Row>
    {currentClient.display}
    {currentProject.display}
  </Row>
  <Row>
    <Col>
    {
      book._clients.map(x=>{
        return(
          <ClientCard client={x} onSelectClient={handleClientSelect} currentClient={currentClient} key={x.id}/>
        )
      })
    }
    </Col>

    <Col>
      {
        list._projects.map(x=>{
          return(
            <ProjectCard project={x} onSelectProject={handleProjectSelect} currentClient={currentClient} currentProject={currentProject} key={x.id}/>
          )
        })
      }
    </Col>

    <Col>
    </Col>
  

    <Col>
    </Col>
  </Row>
</Fragment>
  )
}