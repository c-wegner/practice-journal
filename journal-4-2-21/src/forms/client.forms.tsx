import React from 'react'
import styled from 'styled-components'
import { useContext } from "react";
import { useState } from "react";
import { common } from '../globals';
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main';
import { FormProvider } from '../controls/forms.context';
import { Client } from '../models';
import { clientPath } from '../models/client';
import { Row } from '../globals/styles';
import { ConditionalContent, RadioCheck, TextArea, TextBox } from '../controls';
import { Checkbox } from '../controls/checkbox';

const FormStyle = styled.div `
  width: 800px;
  max-width: 90%;
  margin: auto;

  @media(min-width: ${common.values.screen.md}){
    margin: 0 0 0 20px;
  }
`

export const ClientForm = ({
  obj = new Client(),
})=>{
  return(
<FormStyle>
    <FormProvider obj={obj} nextObject={new Client()} path={clientPath}>
      <PivotProvider>
          <PivotPage id='General'>
            <Row justifyContent='flex-end'>
              <Checkbox label='Business client' prop='isBusiness' right/>
            </Row>
            <Row>
              <TextBox label='Name' prop= 'name'/>
              </Row>
              <ConditionalContent prop='isBusiness' conditionState={true}>
                <TextBox width='70%' label = 'Contact name' prop='contact'/>
                <TextBox width='30%' label= 'Contact position' prop='contactTitle'/>
              </ConditionalContent>
              <Row>
                <TextBox width='50%' label='Phone number' prop='phone'/>
                <TextBox width='50%' label='Email address' prop='email'/>
              </Row>
              <Row>
                <TextArea label='Address' prop='address' rows={4}/>
              </Row>

              <Row>
                <TextArea label='General notes' prop='notes' rows={2}/>
              </Row>
          </PivotPage>
          <PivotPage id='Billing'>
            <Row>
              <RadioCheck label = 'Hourly' prop='billingType' radioValue='hourly'/>
              <RadioCheck label = 'Fixed fee' prop='billingType' radioValue='fixed'/>
              <RadioCheck label = 'Subscription' prop='billingType' radioValue='subscription'/>
              <RadioCheck label = 'Hybrid' prop='billingType' radioValue='hybrid'/>
              </Row>
              <Row justifyContent='flex-end'>
                  <TextBox label='Billing rate' prop='billRate' inputType='number'width="30%"/>
              </Row>
              <Row>
                <TextArea label='Billing terms' prop='billTerms'/>
              </Row>
              <Row justifyContent='flex-end'>
                  <TextBox label='Initial quote' prop='initialEstimate' inputType='number'width="30%"/>
              </Row>
          </PivotPage>
        </PivotProvider>
    </FormProvider>
</FormStyle>
    )
}