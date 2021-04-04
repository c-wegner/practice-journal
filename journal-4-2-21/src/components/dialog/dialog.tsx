import React from 'react';
import styled from 'styled-components';
import { common } from "../../globals";

const Styles = {
  Container: styled.div<{display:string}> `
    margin: 0 auto;
    margin-top: 20%;
    width: 100%;
    max-width: 700px;
    box-shadow: ${common.values.shadow.hover};
    display: ${p=>p.display};
    flex-direction: column;
    border-radius: ${common.values.borderRadius};
    border: ${common.values.border};
    padding: ${common.values.padding};
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
    <Styles.Container display={display()}>
      <Styles.ExitBar>
        <Styles.ExitMark onClick ={()=>onExit()}>
          x
        </Styles.ExitMark>
      </Styles.ExitBar>
      {children}
    </Styles.Container>
  )
}