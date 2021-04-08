import React, { useImperativeHandle } from 'react'
import styled from 'styled-components'
import { useContext } from "react";
import { useState } from "react";
import { common } from '../globals';
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main';
import { FormContext, FormProvider } from '../controls/forms.context';
import { Client } from '../models';
import { clientPath } from '../models/client';
import { Col, Row } from '../globals/styles';
import { Button, ConditionalContent, RadioCheck, TextArea, TextBox } from '../controls';
import { Checkbox } from '../controls/checkbox';

const FormStyle = styled.div`
  width: 800px;
  max-width: 90%;
  margin: auto;

  @media(min-width: ${common.values.screen.md}){
    margin: 0 0 0 20px;
  }
`

export const ClientForm = ({
  obj = new Client(),
}) => {
  return (
    <FormStyle>
      <FormProvider obj={obj} nextObject={new Client()} path={clientPath}>
        <Row justifyContent='flex-end'>
          <Checkbox label='Flag client' prop='flagged' right/>
        </Row>
        <PivotProvider>
          <PivotPage id='General'>
            <Row justifyContent='flex-end'>
              <Checkbox label='Business client' prop='isBusiness' right />
            </Row>
            <Row>
              <TextBox label='Name' prop='name' />
            </Row>
            <ConditionalContent prop='isBusiness' conditionState={true}>
              <TextBox width='70%' label='Contact name' prop='contact' />
              <TextBox width='30%' label='Contact position' prop='contactTitle' />
            </ConditionalContent>
            <Row>
              <TextBox width='50%' label='Phone number' prop='phone' />
              <TextBox width='50%' label='Email address' prop='email' />
            </Row>
            <Row>
              <TextArea label='Address' prop='address' rows={4} />
            </Row>

            <Row>
              <TextArea label='General notes' prop='notes' rows={2} />
            </Row>
          </PivotPage>
          <PivotPage id='Related'>
            <Row>
              <TextArea
                width='50%'
                label='Related individuals'
                prop='relatedIndividuals'
              />

              <TextArea
                width='50%'
                label='Related companies'
                prop='relatedBusinesses'
              />
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
            <Row>
              <Col alignItems='flex-end'>
                <Checkbox label='Archived' prop='archived' right />
                <Checkbox label='Firm related' prop='firmRelated' right />
              </Col>
              <Col alignItems='flex-end'>
                <Checkbox
                  label='Prospect'
                  prop='prospect'
                  right
                />

                <Checkbox
                  label='Use alternate name'
                  prop='useAltName'
                  right
                />
              </Col>
            </Row>
            <ConditionalContent prop='useAltName' conditionState={true}>
              <TextBox label='Alternate name' prop='altName' />
            </ConditionalContent>

            <ConditionalContent prop='isBusiness' conditionState={true}>
              <Checkbox label='Serve as registered agent' prop='registeredAgent' right/>
            </ConditionalContent>

            <ConditionalContent prop='registeredAgent' conditionState={true}>
              <TextBox label='State' prop='registeredAgentState' width='50%'/>
              <TextBox label='Annual report date' prop='registeredAgentDate' width='50%' inputType='date'/>
            </ConditionalContent>
          </PivotPage>

        </PivotProvider>

        <SubmitButton />
      </FormProvider>
    </FormStyle>
  )
}


function SubmitButton() {
  const formContext = useContext(FormContext)

  const handleSubmit = () => {
    const submitState = formContext.objectState
    if (submitState['lastSave'] === -1 || submitState['lastSave'] === undefined) {
      submitState['id'] = new Date().getTime().toString()
    }
    formContext.submit(submitState)
  }

  return (
    <Row justifyContent='flex-end'>
      <Button width='30%' onClick={() => handleSubmit()} label='Submit' />
    </Row>
  )
}