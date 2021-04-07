import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Panel } from '../components/panels/panel'
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main'
import { Dropdown, TextArea, TextBox } from '../controls'
import { Checkbox } from '../controls/checkbox'
import { FormProvider } from '../controls/forms.context'
import { Row } from '../globals/styles'
import { Client } from '../models'


const BS = styled.div `
  width: 50%;
`


export const Practice = () => {
  const [panelTest, setPanelTest] = useState('Hi')

  return (
    <FormProvider obj={new Client()} nextObject={new Client()}>
      <Checkbox prop='name' label='name' />
      <Checkbox prop='name' label='name' />
      <span onClick={() => setPanelTest('tuba')}>Here</span>
      <PivotProvider>

          <PivotPage id='Testing'>
            This is a test
        </PivotPage>

          <PivotPage id='Testing part 2'>
            <TextArea
              label='Testing this out baby'
              prop='tester'
              rows={21}
            />
  <BS>
            <TextBox label='hahaha' prop='TextTesting' />
            </BS>
          </PivotPage>
      </PivotProvider>

      <Panel id='tuba' current={panelTest} onExit={() => setPanelTest('')}>
        <Dropdown prop='tester' label='Testing ' options={[{ display: 'hi', value: 'howdy', active: true }]} />
        <TextBox label='hahaha' prop='TextTesting' width='59%' />
        <Dropdown prop='tester' label='Testing ' />
      </Panel>
    </FormProvider>
  )
}