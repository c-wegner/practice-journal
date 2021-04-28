import React, { Fragment } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { TimeForm } from '../../forms/time.form';
import { Client, ClientsContext, Project, ProjectsContext, TimesContext } from '../../_models';
import { Dialog } from '../dialog/dialog';
import *as Icons from '../icons/_icons.v.2'
import { Panel } from '../panel/panels';
import { useTimekeeper } from './use.timer.card';
import {TimerContainerItem, TimerContainerStyle} from './time.card'

function convertToTimerFormat(currentInSeconds: number){
  let h = Math.floor(currentInSeconds / 3600);
  let m = Math.floor(currentInSeconds % 3600 / 60);
  let s = Math.floor(currentInSeconds % 3600 % 60);

  let sec = s.toString()
  if(s<10){
    sec= '0' + sec
  }

  let min = m.toString() 
  if(m<10){
    min = '0' + min
  }

  const colon = (s%2)===0? ':' : ' '

  return h.toString() + colon + min + '.' + sec
}

function convertToEntryFormat(currentInSeconds){
  let temp = currentInSeconds / 60
  temp = temp/60
  return ((temp*10)/10) + .1
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function TimerFace({ obj, onExit, startingTimeInSeconds = 0}) {
  const [showPanel, setShowPanel] = useState('')
  const [timerTime, setTimerTime] = useState(startingTimeInSeconds)

  const [timerRunning, setTimerRunning] = useState(obj.timerIsRunning)

  const timer = useTimekeeper(timerRunning, setTimerTime, startingTimeInSeconds)

  const wegnerStoredTimerData = {
    objType: obj.classType,
    objId: obj.id,
    timerRunning: timerRunning,
    currentTime: timerTime,
    lastSave: new Date().getTime()
  }

  useEffect(() => {
    wegnerStoredTimerData.currentTime = timerTime
    wegnerStoredTimerData.timerRunning = timerRunning
    wegnerStoredTimerData.lastSave = new Date().getTime();
    if(timerRunning){
   localStorage.setItem('wegnerStoredTimerData', JSON.stringify(wegnerStoredTimerData))
    }
  }, [timerTime, timerRunning])




  const handlePlay = () => {
    if (timerRunning) {
      setTimerRunning(false)
    } else {
      setTimerRunning(true)
    }
  }
  const handleRecord = () => {
    setShowPanel('Record time')
    setTimerRunning(false)
    localStorage.removeItem('wegnerStoredTimerData')
  }

  const handleDoneWithRecording=()=>{
    setShowPanel('')
    onExit()
  }

  const handleCancel = () => {
    if (timerRunning) {
      handlePlay()
    } else {
      setTimerRunning(false)
      localStorage.removeItem('wegnerStoredTimerData')
      onExit()
    }
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
          {convertToTimerFormat((timerTime))}
        </TimerContainerItem>
        <TimerContainerItem>
          <Icons.Cancel display size='.8rem' onClick={() => handleCancel()} />
        </TimerContainerItem>
      </TimerContainerStyle>
      <Panel id='Record time' onExit={() => handleDoneWithRecording()} current={showPanel}>
        <TimeForm obj={obj.createNewTimeEntry(convertToEntryFormat(timerTime))} />
      </Panel>
    </Fragment>
  )
}