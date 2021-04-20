import React, {useContext} from 'react'
import styled from 'styled-components'

import { useState } from "react";
import { common } from '../globals';
import { PivotContext, PivotPage, PivotProvider } from '../components/pivot/pivot.main';
import { FormContext, FormProvider } from '../controls/forms.context';
import { Client, Clients, ClientsContext, Project, Projects, ProjectsContext, Time, timePath } from '../_models';
import { Col, Row } from '../globals/styles';
import { Button, ConditionalContent, Dropdown, RadioCheck, TextArea, TextBox } from '../controls';
import { Checkbox } from '../controls/checkbox';
import { ClientMatterPicker } from '../controls/client.matter.picker';

const FormStyle = styled.div`
  width: 800px;
  max-width: 90%;
  margin: auto;
  @media(min-width: ${common.values.screen.md}){
    margin: 0 0 0 20px;
  }
`

export const TimeForm = ({
  obj = new Time(),
}) => {


  return (
    <FormStyle>
      <FormProvider obj={obj} nextObject={new Time()} path={timePath}>
        <Row justifyContent='flex-end'>
          <Checkbox label='Flag entry' prop='flagged' right/>
        </Row>
        <PivotProvider>
          <PivotPage id='Time entry'>
          <ClientMatterPicker />

            <Row justifyContent='flex-end'>
            <TextBox inputType='date' width='50%' label='Billing date' prop='billTo'/>
              <TextBox inputType='number' width='50%' label='Time' prop='time'/>
            </Row>

            <Row>
              <TextArea label='Notes' prop='notes' rows={2} />
            </Row>
          </PivotPage>
          <PivotPage id='Expense'>
            <Row>
              <TextBox label='Description' prop='description' width='70%'/>
              <TextBox label = 'Amount' prop='charge' width='30%' inputType='number'/>
            </Row>
          </PivotPage>
          <PivotPage id='Options'>
            <Row>

              <Checkbox label='Billable' prop='billable' right />

            </Row>
          </PivotPage><SubmitButton />
        </PivotProvider>


      </FormProvider>
    </FormStyle>
  )
}


function SubmitButton() {
  const formContext = useContext(FormContext)
  const pivotContext = useContext(PivotContext)

  const list = useContext(ProjectsContext);

  const handleSubmit = () => {
    const submitState = formContext.objectState
    const proj = list.getProject(submitState['projectDisplay'])

    submitState['projectId'] = proj.id
    if (submitState['lastSave'] ===0 || submitState['lastSave'] === undefined) {
      submitState['id'] = new Date().getTime().toString()
    }

    submitState['lastSave'] = new Date().getTime()


    pivotContext.reset()
    formContext.submit(submitState)
  }

  return (
    <Row justifyContent='flex-end'>
      <Button width='30%' onClick={() => handleSubmit()} label='Submit' />
    </Row>
  )
}