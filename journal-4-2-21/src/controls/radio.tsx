import React, {useContext} from 'react';
import { LegacyCheckbox } from './checkbox';
import { FormContext } from './forms.context';



export const RadioCheck=({
  label,
  prop,
  radioValue, 
  width= 'inherit', boxFirst = false, right = false
})=>{
  const formContext = useContext(FormContext);
  const checkForClear=(val)=>{
    if(formContext.objectState[prop]===radioValue){
      return ''
    }else{
      return radioValue
    }
  }

  const getValue = ()=>{
    const cur = formContext.objectState[prop];
    if(cur === radioValue){
      return true;
    }else{
      return false
    }
  }
  return(
    <LegacyCheckbox
      label={label}
      onChange={()=>formContext.update(checkForClear(radioValue), prop)}
      value={getValue()}
      boxFirst={boxFirst}
      width={width}
      right={right}
    />
  )
}