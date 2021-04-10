import React from 'react';
import styled from 'styled-components';
import { common } from "../../globals";

const Styles = {
  Stage: styled.div<{display: string}> `
    display: ${p=>p.display};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
  `,

  Container: styled.div<{display:string}> `
    margin: 5% auto;
    width: 100%;
    max-width: 700px;
    box-shadow: ${common.values.shadow.hover};
    display: ${p=>p.display};
    flex-direction: column;
    border-radius: ${common.values.borderRadius};
    border: ${common.values.border};
    padding: ${common.values.padding};
    z-index: 5;
    background-color: white;
  `,

  ExitBar: styled.div `
    display: flex;
    justify-content: flex-end;
  `,

  ExitMark: styled.div `
  cursor: pointer;
    &:hover{
      color: red;
    }
  `,
}

export const Dialog=({id, current, children, onExit})=>{

  const display=()=>{
    const temp = id === current
    if(temp) return 'flex'
    return 'none'
  }
  return(
    <Styles.Stage display={display()}>
    <Styles.Container display={display()}>
      <Styles.ExitBar>
        <Styles.ExitMark onClick ={()=>onExit()}>
          x
        </Styles.ExitMark>
      </Styles.ExitBar>
      {children}
    </Styles.Container>
    </Styles.Stage>
  )
}