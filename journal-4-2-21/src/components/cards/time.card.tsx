import React from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { Client, Project } from '../../_models';
import *as Icons from '../icons'

const TimerContainerStyle = styled.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
` 

const TimerContainerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  font-size: 1rem;
`

interface ICardTime{
  obj: Client | Project
}

export const CardTime: React.FunctionComponent<ICardTime>=({obj})=>{
  const [timeChange, setTimeChange] = useState(0)

  const handleIncrease=()=>{
    setTimeChange(timeChange=>timeChange+.1)
  }

  const handleDecrease=()=>{
    let newTime = timeChange -.1;
    if(newTime<0){newTime=0}
    setTimeChange(newTime)
  }

  const getClockColor=()=>{
    if(timeChange!==0){
      return 'red'
    }else{
      return 'inherit'
    }
  }

  const getClockSize=()=>{
    if(timeChange!==0){
      return '1rem'
    }else{
      return '.8rem'
    }  
  }

  const handleQuickTimeEntry=()=>{
    if(timeChange>0){
      const t = 
    }
  }

  return(
    <TimerContainerStyle>
      <TimerContainerItem>
        <Icons.Increase display color='green'onClick={()=>handleIncrease()}/>
      </TimerContainerItem>
      <TimerContainerStyle>
        <Icons.Decrease display color= 'red' onClick={()=>handleDecrease()}/>
      </TimerContainerStyle>
      <TimerContainerItem>
        {convertToTimerFormat(obj.currentTime + timeChange)}
      </TimerContainerItem>
      <TimerContainerItem>
        <Icons.Clock display  size={getClockSize()} color={getClockColor()}/>
      </TimerContainerItem>
    </TimerContainerStyle>
  )
}

function convertToTimerFormat(current: number){
  let temp = Math.round(current*10)/10
  if(temp===0){
    return '0.0'
  }

  if(temp < 1){
    return  temp
  }else{
    return temp.toFixed(1)
  }
}