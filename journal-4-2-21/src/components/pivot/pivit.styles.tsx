import React from 'react';
import styled from 'styled-components';

export const PivotStyles = {
  Stage: styled.div `
    display: flex;
    flex-direction: column;
  `,

  MenuBar:styled.div `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
  `,

  MenuOption: styled.div<{color: string, borderColor: string}>  `
    color: ${p=>p.color};
    margin: 5px 0 5px 15px;
    border-bottom: 3px solid;
    border-bottom-color: ${p=>p.borderColor};
    padding-bottom: 4px;
    cursor: pointer;
  `
}