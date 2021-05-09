import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { Dropdown } from '../../controls';
import *as Icons from '../icons/_icons.v.2'

const Container = styled.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0; 
  width: 100%;
  border-top: 1px solid;
  background-color: white;
`

const SubContainer = styled.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
 
  width: 100%;
  border-top: 1px solid;
  background-color: white;
`

const GetArrow=({expanded = false, handleExpand})=>{
  if(expanded){
    return(
      <Icons.Decrease color='blue' onClick={()=>handleExpand()}/>
    )
  }else{
    return(
      <Icons.Increase color='blue' onClick={()=>handleExpand()}/>
    )
  }
}


export const TimerClock=({})=>{
  const [expanded, setExpanded] = useState(false)
  const handleExpand=()=>{
    setExpanded(!expanded)
  }

  return(
    <Container>
        <GetArrow expanded={expanded} handleExpand={handleExpand}/>
    </Container>
  )
}