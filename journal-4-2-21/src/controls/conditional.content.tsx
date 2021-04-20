import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';

import {FormContext} from './forms.context';

const ConditionalRowStyle = styled.div<{display: string, width: string}>`
 display: ${p => p.display};
  overflow: hidden;
  width: ${p=>p.width};
`;

export const ConditionalContent = ({
  prop,
  conditionState,
  children,
  initialStateOpen = false,
  width='100%'
}) => {
    const formContext = useContext(FormContext);
  useEffect(()=>{
  }, [formContext.objectState])



  const toggleDisplay = () => {
    const comparableProp = formContext.objectState[prop];
    if (comparableProp !== undefined) {
      if (comparableProp === conditionState) {
        return 'flex';
      } else {
        return "none";
      }
    } else {
      if (initialStateOpen) {
        return 'flex';
      } else {
        return "none";
      }
    }
  };
  return (
    <ConditionalRowStyle display={toggleDisplay()} width={width}>
      {children}
    </ConditionalRowStyle>
  );
};

