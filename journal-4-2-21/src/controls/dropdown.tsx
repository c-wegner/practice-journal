import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FormContext, IFormContext } from "./";
import { Arrow } from "./arrow";
import { Fragment } from "react";
import { common } from "../globals";
import { Container } from "./styles";




export const Dropdown = ({ label, prop, width = "100%", options = [], maxHeight = '50vh' }) => {
  const formContext: IFormContext = useContext(FormContext);

  const getValue = () => {
    const val = formContext.objectState[prop];
    if (val === undefined) {
      return "";
    }
    return val;
  };

  const handleUpdate=(val) =>{
        formContext.update(val, prop);

  }

  return (
    <LegacyDropdown
      label={label}
      value={getValue()}
      onChange={val => {
        handleUpdate(val)
      }}
      width={width}
      options={options}
      maxHeight={maxHeight}
    />
  );
};

const PrimaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  border-radius: 5px;
  
`;

const ComboContainer = styled.div <{radius: string}>`
  min-height: ${common.values.inputHeight};
  padding: ${common.values.padding};
  background-color: ${common.values.backgroundColor};
  border-radius: ${common.values.borderRadius};

  display: flex;
  justify-content: space-between;
  padding: 0;
  background-color: ${common.values.backgroundColor};
    border: ${common.values.border};
    border-bottom-right-radius: ${p=>p.radius};
    border-bottom-left-radius: ${p=>p.radius};

    z-index: 1;
`;

const ComboInput = styled.div`
  flex-grow: 1;
  border: 0;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  padding: ${common.values.padding};
`;

const ArrowBox = styled.div`
  width: initial;
  padding: 0 15px;
  flex-grow: 0;
  border-left: ${common.values.border};
  cursor: pointer;

  min-height: ${common.values.inputHeight};
  padding: ${common.values.padding};
  background-color: ${common.values.backgroundColor};
  border: none;
  border-left: 1px solid;
`;

const DropdownStyle = styled.div<{ zIndex: string }>`
  z-index: ${p => p.zIndex};
  position: absolute;

  width: 100%;
  margin-top: 2.5rem;
  max-height: 50vh;
  cursor: pointer;
  background-color: white;


`;

export const LegacyDropdown = ({
  label,
  value,
  onChange,
  options = [],
  width = "100%",
  maxHeight = "50vh"
}) => {
  const [expanded, setExpanded] = useState(false);

  const showOptions = () => {
    if (expanded) {
      return maxHeight;
    } else {
      return "0";
    }
  };

  const handleSelect = x => {
    value = x.display;
    onChange(x.display);
    setExpanded(false);
  };

  return (
    <Container width={width}>
      <label>{label}</label>
      <PrimaryContainer>
        <ComboContainer radius={expanded?  '0': common.values.borderRadius}>
          <ComboInput>{value}</ComboInput>
          <ArrowBox onClick={() => setExpanded(!expanded)}>
            <Arrow down={!expanded} up={expanded} />
          </ArrowBox>
        </ComboContainer>
        <DropdownStyle zIndex={expanded ? "5" : "0"}>
          <OptionBoxStyle maxHeight={showOptions()}>
            <ComboOption
              onClick={() => handleSelect({ value: "", display: "" })}
            >
   
            </ComboOption>
            {options.map(x => {
              if (!x.active) {
                return <Fragment />;
              }
              return (
                <ComboOption onClick={() => handleSelect(x)} key={x.display}>
                  {x.display}
                </ComboOption>
              );
            })}
          </OptionBoxStyle>
        </DropdownStyle>
      </PrimaryContainer>
    </Container>
  );
};

const OptionBoxStyle = styled.div<{ maxHeight: string }>`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${p => p.maxHeight};
  transition: max-height 0.1s;
  border-radius: 0;
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: ${common.values.shadow.hover};
`;

const OptionStyle = styled.div`
  border-radius: 0;
  border: ${common.values.border};
  border-top: none;
  min-height: ${common.values.inputHeight};
  padding: ${common.values.padding};
`;

const ComboOption = ({ onClick, children }) => (
  <OptionStyle onClick={() => onClick()}>{children}</OptionStyle>
);
