import React, {useState, useContext, Fragment} from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Row } from '../globals/styles';
import { Client, ClientsContext, Project, ProjectsContext } from '../_models';

import {Dropdown, FormContext} from './'
import { TextBox } from './textbox';

export const ClientMatterPicker =({
  clientPropName = 'clientDisplay',
  projectPropName = 'projectDisplay'
})=>{
  const [currentProject, setCurrentProject] = useState(new Project())

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)

  const subjectState = useContext(FormContext)

  useEffect(()=>{
    const currentTask = list.getProject(subjectState.objectState[projectPropName])
    subjectState.objectState['description'] = currentTask.task
    if(currentTask.task !=='' && subjectState.objectState['description']===''){
      subjectState.objectState['description'] = currentTask.task
    }
    setCurrentProject(currentTask)
  }, [subjectState.objectState[projectPropName]])

  return(
    <Fragment>
    <Row>

      <Dropdown label='Client' prop={clientPropName} width='40%' options={book.clients}/>

      <Dropdown label='Project' prop={projectPropName} width= '60%' options={list.projects}/>
    </Row>
    <Row>
      <TextBox label='Description' prop='description'/>
    </Row>
    </Fragment>
  )
}