import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { Container } from "./styles";
import { FormContext, IFormContext } from "./";
import { common } from "../globals";


interface ICheckbox {
  label: string;
  prop: string;
  width?: string;
  boxFirst?: boolean
  right?: boolean;
  startingValue?: boolean;
  readOnly?:boolean;
}

export const Checkbox: React.FC<ICheckbox> = ({ label, prop, width = 'inherit', boxFirst, right, startingValue = false, readOnly=false }) => {
  const formContext: IFormContext = useContext(FormContext);

  const getValue = () => {
    const cur = formContext.objectState[prop]
    if (cur !== undefined) {
      return cur
    }
    formContext.update(startingValue, prop)
    return startingValue
  }

  let present = getValue()

  return (
    <LegacyCheckbox
      label={label}
      onChange={() => formContext.update(!present, prop)}
      value={present}
      boxFirst={boxFirst}
      width={width}
      right={right}
      readOnly={readOnly}
    />
  )
}

const CheckboxContainer = styled.div<{ width: string; justifyContent: string }>`
  display: flex;
  align-items: center;
  background-color: inherit;
  padding-left: 0;
  margin: 1.3rem 0 0 0;
  width: ${p => p.width};
  flex-grow: 1;
  justify-content: ${p => p.justifyContent};
`;

const Box = styled.div<{ backgroundColor: string, borderColor: string }>`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.backgroundColor};
  cursor: pointer;
  border-radius: ${common.values.borderRadius};
  border: ${common.values.border};
  border-color: ${p=>p.borderColor};
    margin-right: ${(parseInt(common.values.padding)* -1)+ 'px'};
`;

const Label = styled.div`
  margin: 0 10px;
`;

export function LegacyCheckbox({
  label,
  onChange,
  value,
  boxFirst = false,
  width = "inherit",
  right = false,
  readOnly = false,
}) {
  const handleClick=()=>{
    if(readOnly){}else{
      onChange(!value)
    }
  }

  if (boxFirst) {
    return (
      <Container
        width={width}
        justifyContent={right ? "flex-end" : "flex-start"}
      >
        <CheckboxContainer
          width={width}
          justifyContent={right ? "flex-end" : "flex-start"}
        >
          <Box
            onClick={() => handleClick()}
            backgroundColor={value ? "#FFF" : "#FFF"}
            borderColor= {value? '#FFF' : '#222'}
          >
            {value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            )}
          </Box>
          <Label>{label}</Label>
        </CheckboxContainer>
      </Container>
    );
  }
  return (
    <Container width="inherit">
      <CheckboxContainer
        width={width}
        justifyContent={right ? "flex-end" : "flex-start"}
      >
        <Label>{label}</Label>
        <Box
          onClick={() => handleClick()}
            backgroundColor={value ? "#FFF" : "#FFF"}
            borderColor= {value? '#FFF' : '#222'}
        >
          {value && (
            <Fragment>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
            </Fragment>
          )}
        </Box>
      </CheckboxContainer>
    </Container>
  );
};