import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { common } from "../globals";

import { FormContext, IFormContext } from "./";
import { Container } from "./styles";

export const TextBox =({
  label,
  prop,
  width = "100%",
  flexGrow = 0,
  readOnly = false,
  inputType = 'text'
})=>{
  const formContext: IFormContext = useContext(FormContext)

  const getValue=()=>{
    const val = formContext.objectState[prop]
    if(val===undefined){return ''}
    if(inputType==='number'){
      if(val === 0){
        return 0
      }
    }
    return val
  }

  return(
    <LegacyTextBox
      value={getValue()}
      onChange={val=>formContext.update(val, prop)}
      label={label}
      width={width}
      inputType={inputType}
      flexGrow={flexGrow}
      readOnly= {readOnly}
    />
  )
}

const Input = styled.input<{border: boolean, alignment: string}>`
  border: ${p => (p.border ? common.values.border : "none")};
  flex-grow: 1;
  width: 100%;
  text-align: ${p=>p.alignment};
`;

export const LegacyTextBox = ({
  label,
  value,
  onChange,
  width = "100%",
  flexGrow = 0,
  readOnly = false,
  inputType = 'text'
}) => {
  
  const getAlignment=()=>{
    if(inputType==='number') return 'right'
    return 'left'
  }
  
  return (
  <Fragment>
    <Container width={width} flexGrow={flexGrow}>
      <label>{label}</label>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readOnly}
        border={!readOnly}
        type={inputType}
        alignment={getAlignment()}
      />
    </Container>
  </Fragment>
)};

function cloneObject(obj) {
  let temp = new Object();
  for (let p in obj) {
    temp[p] = obj[p];
  }
  return temp;
}

///////////////////////////////

const TextAreaInputStyle = styled.textarea<{border: boolean}>`
  border: ${p => (p.border ? common.values.border : "none")};
  resize: none;
`;
export const TextArea =({
  label,
  prop,
  width = "100%",
  flexGrow = 0,
  readOnly = false,
rows=3
})=>{
  const formContext: IFormContext = useContext(FormContext)

  const getValue=()=>{
    const val = formContext.objectState[prop]
    if(val===undefined){return ''}
    return val
  }

  return(
    <LegacyTextArea
      value={getValue()}
      onChange={val=>formContext.update(val, prop)}
      label={label}
      width={width}
      flexGrow={flexGrow}
      readOnly= {readOnly}
      rows={rows}
    />
  )
}



export const LegacyTextArea = ({
  label,
  value,
  onChange,
  width = "100%",
  flexGrow = 0,
  readOnly = false,
  rows=3
}) => { 

  
  return(
  <Fragment>
    <Container width={width} flexGrow={flexGrow}>
      <label>{label}</label>
      <TextAreaInputStyle
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readOnly}
        border={!readOnly}
        rows={rows}
      />
    </Container>
  </Fragment>
)};