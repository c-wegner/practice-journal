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

const Input = styled.input<{border: boolean}>`
  border: ${p => (p.border ? common.values.border : "none")};
`;

export const LegacyTextBox = ({
  label,
  value,
  onChange,
  width = "100%",
  flexGrow = 0,
  readOnly = false,
  inputType = 'text'
}) => (
  <Fragment>
    <Container width={width} flexGrow={flexGrow}>
      <label>{label}</label>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readOnly}
        border={!readOnly}
        type={inputType}
      />
    </Container>
  </Fragment>
);

function cloneObject(obj) {
  let temp = new Object();
  for (let p in obj) {
    temp[p] = obj[p];
  }
  return temp;
}
