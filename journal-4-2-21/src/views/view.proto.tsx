import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Panel } from '../components/panels/panel'
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main'
import { Dropdown, TextArea, TextBox } from '../controls'
import { FormProvider } from '../controls/forms.context'
import { Col, Row } from '../globals/styles'
import { Client, ClientsContext, Project, ProjectsContext, TimeContext } from '../models'
import { ClientForm } from '../forms/client.forms'
import { ProjectForm } from '../forms/project.forms'
import { useContext } from 'react'
import { ClientCard } from '../components/card/client.card'

import { ProjectCard } from '../components/card/project.card'


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

  const addClient=()=>{
    setPanelTest('Add client')
  }



  return (
<Fragment>
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
        list.getProjectByLane('@Wegner Law PLLC').map(x=>{
          return(
            <ProjectCard project={x} onSelectProject={handleProjectSelect} currentClient={currentClient} currentProject={currentProject} key={x.id}/>
          )
        })
      }
    </Col>

    <Col>
    {
        list.getProjectByLane('@Client').map(x=>{
          return(
            <ProjectCard project={x} onSelectProject={handleProjectSelect} currentClient={currentClient} currentProject={currentProject} key={x.id}/>
          )
        })
      }
    </Col>
  

    <Col> 
    <span onClick={()=>addClient()}>Add here</span>
    </Col>
  </Row>

  <Panel id='Add client' current={panelTest} onExit={()=>setPanelTest('')}>
    <ClientForm />
  </Panel>
</Fragment>
  )
}