import React from 'react';
import styled from 'styled-components'
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

export const CardTime=({currentTime})=>{
  return(
    <TimerContainerStyle>
      <TimerContainerItem>
        <Icons.Increase display color='green'/>
      </TimerContainerItem>
      <TimerContainerStyle>
        <Icons.Decrease display color= 'red'/>
      </TimerContainerStyle>
      <TimerContainerItem>
        {convertToTimerFormat(currentTime)}
      </TimerContainerItem>
      <TimerContainerItem>
        <Icons.Clock display color='inherit' size='.8rem'/>
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