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
  `
}

export const Dialog=({children, onExit})=>{
  return(
    <Styles.Container display={'flex'}>
      {children}
    </Styles.Container>
  )
}