import React from "react";
import styled from "styled-components";
import { common } from "../globals/";

export const Styles = {
  RowStyle: styled.div<{justifyContent: string, alignItems:string}> `
    display: flex;
    flex-direction: column;
    width: 99%;
    margin: 0 auto;

    @media (min-width: ${common.values.screen.md}) {
      flex-direction: row;
      justify-content: ${p => p.justifyContent};
      align-items: ${p => p.alignItems};
    }
  `,

  ColStyle: styled.div <{justifyContent: string, alignItems:string, width: string, flexGrow: number}>`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: ${common.values.screen.md}) {
      width: ${p => p.width};
      justify-content: ${p => p.justifyContent};
      align-items: ${p => p.alignItems};
      flex-grow: ${p => p.flexGrow};
  
    }
  `,

  Container: styled.div<{justifyContent: string, alignItems:string,width: string, flexGrow: number}>`
    display: flex;
    flex-direction: column;
    width: 95%;
    padding: ${common.values.padding};
    margin: ${common.values.margin};


    @media (min-width: ${common.values.screen.md}) {
      width: ${p => p.width};
      justify-content: ${p => p.justifyContent};
      align-items: ${p => p.alignItems};
      flex-grow: ${p => p.flexGrow};
      box-sizing: border-box;

    }
  `
};

export const Container = ({
  children,
  width='100%',
  flexGrow=1,
  justifyContent='flex-start'
})=>(
  <Styles.Container width={width} flexGrow={flexGrow} justifyContent={justifyContent} alignItems='flex-start'>
    {children}
  </Styles.Container>
)