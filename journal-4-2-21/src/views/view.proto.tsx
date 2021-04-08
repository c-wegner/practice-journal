import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Panel } from '../components/panels/panel'
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main'
import { Dropdown, TextArea, TextBox } from '../controls'
import { FormProvider } from '../controls/forms.context'
import { Row } from '../globals/styles'
import { Client } from '../models'
import { ClientForm } from '../forms/client.forms'
import { ProjectForm } from '../forms/project.forms'


const BS = styled.div`
  width: 50%;
`


export const Practice = () => {
  const [panelTest, setPanelTest] = useState('Hi')

  return (
    <FormProvider obj={new Client()} nextObject={new Client()}>
    
      <span onClick={() => setPanelTest('tuba')}>Here</span>
      <br />
      <span onClick={() => setPanelTest('Player')}>There</span>
 
      <Panel id='tuba' current={panelTest} onExit={() => setPanelTest('')}>
        <ClientForm />
      </Panel>

      <Panel id='Player' current={panelTest} onExit={()=>setPanelTest('')}>
        <ProjectForm/>
      </Panel>
    </FormProvider>
  )
}