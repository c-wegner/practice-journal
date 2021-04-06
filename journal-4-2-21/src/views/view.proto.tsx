import React from 'react'
import { useState } from 'react'
import { Panel } from '../components/panels/panel'
import { Checkbox } from '../controls/checkbox'
import { FormProvider } from '../controls/forms.context'
import { Client } from '../models'


export const Practice = ()=>{
const [panelTest, setPanelTest] = useState('Hi')

  return(
    <FormProvider obj={new Client()} nextObject={new Client()}>
      <Checkbox prop='name' label='name'/>
      <Checkbox prop='name' label='name'/>
      <span onClick={()=>setPanelTest('tuba')}>Here</span>

      <Panel id='tuba' current={panelTest} onExit={()=>setPanelTest('')}>
        yada
      </Panel>
    </FormProvider>
  )
}