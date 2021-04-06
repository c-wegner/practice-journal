import React from 'react'
import { Checkbox } from '../controls/checkbox'
import { FormProvider } from '../controls/forms.context'
import { Client } from '../models'


export const Practice = ()=>{
  return(
    <FormProvider obj={new Client()} nextObject={new Client()}>
      <Checkbox prop='name' label='name'/>
      <Checkbox prop='name' label='name'/>
    </FormProvider>
  )
}