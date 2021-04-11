import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { Row } from '../globals/styles';
import { Client, ClientsContext, ProjectsContext } from '../models';

import {Dropdown, FormContext} from './'

export const ClientMatterPicker =({
  clientPropName = 'clientDisplay',
  projectPropName = 'projectDisplay'
})=>{
  const [clientDisplay, setClientDisplay] = useState(new Client())

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)
  const subjectState = useContext(FormContext)

  const currentClient = book.getClientByName(subjectState[clientPropName])

  return(
    <Row>

      <Dropdown label='Client' prop={clientPropName} width='30%' options={book.getCurrentClientsForDropDown(false)}/>
      <Dropdown label='Project' prop={projectPropName} width= '70%' options={list.getProjectsForDropDown(subjectState.objectState['clientId'])}/>

   
    </Row>
  )
}