import React, { Fragment } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { TimeForm } from '../../forms/time.form';
import { Client, ClientsContext, Project, ProjectsContext, TimesContext } from '../../_models';
import *as Icons from '../icons/_icons.v.2'
import { Panel } from '../panel/panels';
import { useTimekeeper } from './use.timer.card';

const TimerContainerStyle = styled.div`
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

interface ICardTime {
  obj: Client | Project
}

export const CardTime: React.FunctionComponent<ICardTime> = ({ obj }) => {
  const [showTimer, setShowTimer] = useState(false)

  const [baseTime, setBaseTime] = useState(obj.currentTime)
  const [timeChange, setTimeChange] = useState(0)

  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)
  const timeSheet = useContext(TimesContext)

  useEffect(() => { }, [timeChange])

  const handleIncrease = () => {
    setTimeChange(timeChange => timeChange + .1)
  }

  const handleDecrease = () => {
    let newTime = timeChange - .1;
    if (newTime < 0) { newTime = 0 }
    setTimeChange(newTime)
  }

  const getClockColor = () => {
    if (timeChange !== 0) {
      return 'red'
    } else {
      return 'inherit'
    }
  }

  const getClockSize = () => {
    if (timeChange !== 0) {
      return '1rem'
    } else {
      return '.8rem'
    }
  }

  const getTimeValue=()=>{
    if(timeChange!==0){
      return timeChange
    }else{
      return baseTime
    }
  }

  const HandleQuickTimeEntry = () => {

    
    if (timeChange > 0) {

      const t = obj.createNewTimeEntry()
      let myTimeChange = Math.round(timeChange * 10) / 10
      t.time = myTimeChange
      let finalSubmit = timeSheet.groupTimes(t)

      finalSubmit.save()
      if(obj.classType==='project'){
        book.updateProjectTime(obj['clientId'], t.time)
      }
      setBaseTime(baseTime + timeChange)
      setTimeChange(0)
    } else {
      setShowTimer(true)
    }
  }

  if (showTimer) {
    return (
      <TimerFace onExit={() => setShowTimer(false)} obj={obj} />
    )
  } else {

    return (
      <TimerContainerStyle>
        <TimerContainerItem>
          <Icons.Increase display color='green' onClick={() => handleIncrease()} />
        </TimerContainerItem>
        <TimerContainerStyle>
          <Icons.Decrease display color='red' onClick={() => handleDecrease()} />
        </TimerContainerStyle>
        <TimerContainerItem>
          {convertToTimerFormat(getTimeValue())}
        </TimerContainerItem>
        <TimerContainerItem>
          <Icons.Clock display size={getClockSize()} color={getClockColor()} onClick={() => HandleQuickTimeEntry()} />
        </TimerContainerItem>
      </TimerContainerStyle>
    )
  }
}

function convertToTimerFormat(current: number) {
  let temp = Math.round(current * 10) / 10
  if (temp === 0) {
    return '0.0'
  }

  if (temp < 1) {
    return temp
  } else {
    return temp.toFixed(1)
  }
}

function TimerFace({ obj, onExit }) {
  const [showPanel, setShowPanel] = useState('')
  const [timerTime, setTimerTime] = useState(0)

  const [timerRunning, setTimerRunning] = useState(true)

  const timer = useTimekeeper(timerRunning, setTimerTime, 0)

  const handlePlay = () => {
    if (timerRunning) {
      setTimerRunning(false)
    } else {
      setTimerRunning(true)
    }
  }
  const handleRecord = () => {

  }


  const showPlayOrPause = () => {
    if (timerRunning) {
      return (
        <Icons.Pause onClick={() => handlePlay()} />
      )
    } else {
      return (
        <Icons.Play onClick={() => handlePlay()} />
      )
    }
  }
  return (
    <Fragment>
      <TimerContainerStyle>
        <TimerContainerItem>
          {showPlayOrPause()}
        </TimerContainerItem>
        <TimerContainerStyle>
          <Icons.Record display color={timerRunning ? 'lightgray' : 'red'} onClick={() => handleRecord()} />
        </TimerContainerStyle>
        <TimerContainerItem>
          {convertToTimerFormat(timerTime)}
        </TimerContainerItem>
        <TimerContainerItem>
          <Icons.Cancel display size='.8rem' onClick={() => onExit()} />
        </TimerContainerItem>
      </TimerContainerStyle>
      <Panel id='Record time' onExit={()=>setShowPanel('')} current={showPanel}>
        <TimeForm obj={obj.createNewTimeEntry()}/>
      </Panel>
    </Fragment>
  )
}