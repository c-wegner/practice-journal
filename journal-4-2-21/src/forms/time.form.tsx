import React, {Fragment, useContext} from 'react'
import styled from 'styled-components'
import firebase, { app } from "../models/firebase";

import { useState } from "react";
import { common } from '../globals';
import { PivotContext, PivotPage, PivotProvider } from '../components/pivot/pivot.main';
import { FormContext, FormProvider } from '../controls/forms.context';
import { Client, Clients, ClientsContext, Project, Projects, ProjectsContext, Time, timePath, TimesContext } from '../_models';
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
  const getDeleteButton=()=>{
    if(obj.id!==''){
      return(
        <Fragment>
          <DeleteButton  currentTime={obj}/>
        </Fragment>
      )
    }else{
      return(
        <Fragment></Fragment>
      )
    }
  }

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
          <PivotPage id='Fixed feee'>
            <Row justifyContent='flex-end'>
              <Checkbox label='Fixed fee' prop='flatFee' right/>
            </Row>
            <Row>
              <TextBox label='Description' prop='description' width='70%'/>
              <TextBox label = 'Amount' prop='rate' width='30%' inputType='number'/>
            </Row>
          </PivotPage>
          <PivotPage id='Expense'>
            <Row justifyContent='flex-end'>
              <Checkbox label='Expense' prop='isExpense' right/>
            </Row>
            <Row>
              <TextBox label='Description' prop='description' width='70%'/>
              <TextBox label = 'Amount' prop='rate' width='30%' inputType='number'/>
            </Row>
          </PivotPage>
          <PivotPage id='Options'>
            <Row>

              <Checkbox label='Billable' prop='billable' right />

            </Row>
          </PivotPage><SubmitButton />{getDeleteButton()}
        </PivotProvider>


      </FormProvider>
    </FormStyle>
  )
}


function SubmitButton() {
  const formContext = useContext(FormContext)
  const pivotContext = useContext(PivotContext)

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext);
  const timeSheet = useContext(TimesContext)

  const handleSubmit = () => {
    const submitState = formContext.objectState
    const proj = list.getProject(submitState['projectDisplay'])
    const c = book.getClient(submitState['clientDisplay'])

    submitState['clientId'] = c.id

    submitState['projectId'] = proj.id
    if (submitState['lastSave'] ===0 || submitState['lastSave'] === undefined) {
      submitState['id'] = new Date().getTime().toString()
    }

    submitState['lastSave'] = new Date().getTime()

    const isExpense = submitState['isExpense']
    const isFlatFee = submitState['flatFee']

    if(isExpense || isFlatFee){
      submitState['time'] = 1;
    }

    const finalSubmit = timeSheet.groupTimes(submitState)

    let temp = new Object();

    for(const prop in finalSubmit){
      temp[prop]= finalSubmit[prop]
    }

    console.table(temp)
    pivotContext.reset()
    formContext.submit(temp)
  }

  return (
    <Row justifyContent='flex-end'>
      <Button width='30%' onClick={() => handleSubmit()} label='Submit' />
    </Row>
  )
}

function DeleteButton({currentTime}){
  const pivotContext = useContext(PivotContext)

  const handleDelete=()=>{
    const db = firebase.firestore(app);
    db.collection(timePath)
      .doc(currentTime.id).delete()
      pivotContext.reset()
  }

  return (
    <Row justifyContent='flex-end'>
      <Button width='30%' onClick={() => handleDelete()} label='Delete' />
    </Row>
  )
}