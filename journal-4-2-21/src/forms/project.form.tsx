import React, { useContext } from 'react'
import styled from 'styled-components'

import { useState } from "react";
import { common } from '../globals';
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main';
import { FormContext, FormProvider } from '../controls/forms.context';
import { Client, ClientsContext, Project, Projects, ProjectsContext } from '../_models';
import { projectPath, TimeKeepers } from '../_models/projects/project._model';
import { Col, Row } from '../globals/styles';
import { Button, ConditionalContent, Dropdown, RadioCheck, TextArea, TextBox } from '../controls';
import { Checkbox } from '../controls/checkbox';

const FormStyle = styled.div`
  width: 800px;
  max-width: 90%;
  margin: auto;
  @media(min-width: ${common.values.screen.md}){
    margin: 0 0 0 20px;
  }
`

export const ProjectForm = ({
  obj = new Project(),
}) => {
  const book = useContext(ClientsContext);

  return (
    <FormStyle>
      <FormProvider obj={obj} nextObject={new Project()} path={projectPath}>
        <Row justifyContent='flex-end'>
          <Checkbox label='Flag project' prop='flagged' right />

        </Row>


        <PivotProvider>
          <PivotPage id='General'>
            <Row justifyContent='flex-end' >
              <Checkbox label='Open' prop='open' right />
            </Row>
            <Row >
    <Col width='30%' alignItems='flex-end'>
              <Dropdown
                label='Lane'
                prop='lane'
                options={Projects.listLanesForDropDown}
 
    

              />
</Col>
              <Col alignItems='flex-start' width='70%'>
              <Checkbox
                label='Follow up'
                prop='checkInOn'
                boxFirst

              />
              </Col>





            </Row>
            <Row>
              <Dropdown
                label='Client'
                prop='clientDisplay'
                options={book.clients}
                width='30%'
              />

              <TextBox label='Description' prop='title' width='70%' />
            </Row>


            <Row>
              <TextBox label='Current task' prop='task' />
            </Row>
            <Row>
              <TextBox label='Sub task' prop='subTask' />
            </Row>



            <Row justifyContent='flex-end'>
            <Checkbox
                label='Follow up'
                prop='checkInOn'
                right
              />
            </Row>
           
            <Row justifyContent='flex-end'>

<TextBox label='Current contact' prop='laneContact' width='30%' />
</Row>
            <Row>
              <TextArea label='Notes' prop='notes' rows={4} />
            </Row>
          </PivotPage>
          <PivotPage id='Follow up'>
            <Row>

              <Checkbox label='Call' prop='followUpPhone' />
              <Checkbox label='Send email' prop='followUpSendEmail' />
              <Checkbox
                label='Read email'
                prop='followUpReadEmail'

              />

              <Checkbox
                label='Flag'
                prop='flagged'

              />
            </Row><Row>
              <TextArea label='Notes' prop='followUpNotes' />

            </Row>
          </PivotPage>
          <PivotPage id='Billing'>
            <Row>
              <RadioCheck label='Hourly' prop='billingType' radioValue='hourly' />
              <RadioCheck label='Fixed fee' prop='billingType' radioValue='fixed' />
              <RadioCheck label='Subscription' prop='billingType' radioValue='subscription' />
              <RadioCheck label='Hybrid' prop='billingType' radioValue='hybrid' />
            </Row>
            <Row justifyContent='flex-end'>
              <TextBox label='Billing rate' prop='billRate' inputType='number' width="30%" />
            </Row>
            <Row>
              <TextArea label='Billing terms' prop='billTerms' />
            </Row>
            <Row justifyContent='flex-end'>
              <TextBox label='Initial quote' prop='initialEstimate' inputType='number' width="30%" />
            </Row>
          </PivotPage>
          <PivotPage id='Options'>
            <Row justifyContent='flex-end'>
              <Dropdown width='30%' options={TimeKeepers} prop='assignedTo' label='Assigned to:' />
            </Row>
            <Row>
              <Col alignItems='flex-end'>
                <Checkbox label='Urgent' prop='urgent' right />
                <Checkbox label='Firm related' prop='firmRelated' right />
              </Col>
              <Col alignItems='flex-end'>
                <Checkbox
                  label='Prospect'
                  prop='prospect'
                  right
                />

                <Checkbox
                  label='Bill reminder'
                  prop='billReminder'
                  right
                />
              </Col>
            </Row>

          </PivotPage>

        </PivotProvider>

        <SubmitButton />
      </FormProvider>
    </FormStyle>
  )
}


function SubmitButton() {
  const formContext = useContext(FormContext)
  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)

  const handleSubmit = () => {
    const submitState = formContext.objectState
    const projectClient = book.getClient(submitState['clientDisplay'])
    submitState['clientId'] = projectClient.id
    submitState['clientShortName'] = projectClient.shortName;
    submitState['clientName'] = projectClient.name

    if (submitState['lastSave'] === 0 || submitState['lastSave'] === undefined) {
      submitState['id'] = new Date().getTime().toString()
    }

    if (submitState['projectId'] === undefined || submitState['projectId'] === '') {
      submitState['projectId'] = list.getNextProjectId()
    }
    submitState['lastSave'] = new Date().getTime()
    formContext.submit(submitState)
  }

  return (
    <Row justifyContent='flex-end'>
      <Button width='30%' onClick={() => handleSubmit()} label='Submit' />
    </Row>
  )
}