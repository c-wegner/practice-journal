import React, { Fragment } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { TimeForm } from '../../forms/time.form';
import { Time, TimesContext } from '../../_models';
import { Panel } from '../panel/panels';

const SheetStyle = styled.div `
  width: 75%;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const LineStyle = styled.div<{backgroundColor: string}> `
  display: flex;
  background-color: ${p=>p.backgroundColor};
`

const CellStyle = styled.div<{width: string}> `
  width: ${p=>p.width};
  padding: 4px;
`

const HeaderStyle = styled.div `
  display: flex;
  font-weight: 600;
`

const HeadingStyle = styled.div <{width: string}> `
width: ${p=>p.width};
font-weight: 700;
margin-bottom: 10px;
`


export const TimeSheet=({})=>{
  const timeSheet= useContext(TimesContext)
  const [showPanel, setShowPanel] = useState('')

  const [currentTime, setCurrentTime] = useState(new Time())


  const onSelectTime=(selectedTime: Time)=>{
    if(selectedTime.id===currentTime.id){
      setCurrentTime(new Time())
      setShowPanel('')
    }else{
      setCurrentTime(selectedTime)
      setShowPanel('Edit time')
    }
  }

  const exitPanel=()=>{
    setCurrentTime(new Time())
    setShowPanel('')
  }

  const getBackgroundColor=(row)=>{
    if(row%2===0){
      return 'lightblue'
    }else{
      return 'white'
    }
  }
  return(
    <Fragment>
    <SheetStyle>
      <HeaderStyle>
        <HeadingStyle width='10%'>
          Entry date
        </HeadingStyle>
        <HeadingStyle width='20%'>
          Client
        </HeadingStyle>
        <HeadingStyle width='40%'>
          Description
        </HeadingStyle>
        <HeadingStyle width='10%'>
          Time
        </HeadingStyle>
        <HeadingStyle width='10%'>
          Rate
        </HeadingStyle>
        <HeadingStyle width='10%'>
          Total
        </HeadingStyle>
      </HeaderStyle>
      {
        timeSheet.times.map((x, i)=>(
          <LineStyle backgroundColor={getBackgroundColor(i)} key={x.id} onClick={()=>onSelectTime(x)}>
            <CellStyle width='10%'>
              {x.billTo}
            </CellStyle>
            <CellStyle width='20%'>
              {x.clientName}
            </CellStyle>
            <CellStyle width='40%'>
              {x.description}
            </CellStyle>
            <CellStyle width='10%'>
              {x.time}
            </CellStyle>
            <CellStyle width='10%'>
              {x.rate}
            </CellStyle>
            <CellStyle width='10%'>
              ${(x.time * x.rate).toFixed(2)}
            </CellStyle>
          </LineStyle>
        ))
      } 
    </SheetStyle>
    <Panel id='Edit time' current={showPanel} onExit={()=>exitPanel()}>
      <TimeForm obj={currentTime}/>
    </Panel>
    </Fragment>
  )
}