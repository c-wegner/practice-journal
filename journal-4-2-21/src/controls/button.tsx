import React from "react";
import styled from "styled-components";
import { common } from "../globals";
import { Container } from "./styles";

const Styles={
  Btn: styled.div  `
    display: flex;
    align-items: center;
    border-radius: ${common.values.borderRadius};
    border: ${common.values.border};
    min-height: ${common.values.inputHeight};
    padding: ${common.values.padding};
    cursor: pointer;
    color: blue;
    border-color: blue;
    width: 100%;
  `,
}

export const Button=({
  label = '',
  onClick,
  width= '100%'
})=>{
  return(
    <Container width={width} flexGrow={0}>
      <label>&nbsp;</label>
      <Styles.Btn onClick={()=>onClick()}>
        {label}
      </Styles.Btn>
    </Container>
  )
}

