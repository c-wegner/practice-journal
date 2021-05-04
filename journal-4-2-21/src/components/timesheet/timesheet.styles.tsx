import React, { Fragment } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { LegacyDropdown } from '../../controls';
import { TimeForm } from '../../forms/time.form';
import { Row } from '../../globals/styles';
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
const initialFilters={
  showBilled: false,
  startDate: new Date().getTime()- (86400000 * 30),
  endDate: new Date().getTime() + 86400000,
  client: '',
}


export const TimeSheet=({})=>{
  const timeSheet= useContext(TimesContext)
  const [showPanel, setShowPanel] = useState('')
  const [currentTime, setCurrentTime] = useState(new Time())
  const [currentClientFilter, setCurrentClientFilter] = useState('')

  const [currentFilter, setCurrentFilter] = useState(initialFilters)


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
      <Row>
        <LegacyDropdown
          label='Client'
          value={currentClientFilter}
          onChange={(x)=>{
            
            setCurrentClientFilter(x)
          }}
          options={timeSheet.getEligableClients(
            currentFilter.showBilled,
            currentFilter.startDate,
            currentFilter.endDate,
            currentFilter.client,
            true
          )}

          width='30%'
        />
      </Row>
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
        timeSheet.filterEntries(
          true,
          0,
          new Date().getTime(),
          currentClientFilter, 
          true
        ).map((x, i)=>(
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