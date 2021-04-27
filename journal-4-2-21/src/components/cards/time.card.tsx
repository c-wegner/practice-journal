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
  let wegnerStoredTimerData = null;
  let startTimerRunning = true;

  const [showDialog, setShowDialog] = useState('')
  const book = useContext(ClientsContext)
  const list = useContext(ProjectsContext)
  const timeSheet = useContext(TimesContext)
  if (localStorage.getItem('wegnerStoredTimerData')) {
    wegnerStoredTimerData = JSON.parse(localStorage.getItem('wegnerStoredTimerData'))
  }
  let timerStartTime = 0;
  if (wegnerStoredTimerData && obj.hasOpenTime) {
    timerStartTime = wegnerStoredTimerData.currentTime
    if(wegnerStoredTimerData.timerRunning){
      let delta = new Date().getTime() - wegnerStoredTimerData.lastSave
      delta = delta / 1000
      timerStartTime = timerStartTime + delta

    }

  }else{
    startTimerRunning = true;
  }
  useEffect(() => {
    if (obj.hasOpenTime && wegnerStoredTimerData) {

      timerStartTime = wegnerStoredTimerData.currentTime
      if(wegnerStoredTimerData.timerRunning){
        let delta = new Date().getTime() - wegnerStoredTimerData.lastSave
        delta = delta / 1000
        timerStartTime = timerStartTime + delta
  
      }
     

      startTimerRunning = wegnerStoredTimerData.timerRunning
      setShowTimer(true)

    }
  }, [])


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

  const getTimeValue = () => {
    if (timeChange !== 0) {
      return timeChange
    } else {
      return baseTime
    }
  }

  const HandleQuickTimeEntry = () => {


    if (timeChange > 0) {
      localStorage.removeItem('wegnerStoredTimerData')
      const t = obj.createNewTimeEntry()
      let myTimeChange = Math.round(timeChange * 10) / 10
      t.time = myTimeChange
      let finalSubmit = timeSheet.groupTimes(t)

      finalSubmit.save()
      if (obj.classType === 'project') {
        book.updateProjectTime(obj['clientId'], t.time)
      }
      setBaseTime(baseTime + timeChange)
      setTimeChange(0)
    } else {
      if(localStorage.getItem('wegnerStoredTimerData')){
        setShowDialog('Timer running error')
        alert('Cannot have 2 or more timers running at same time. If there are no other timers running and you have reached this message in error, open the Application tab from Web Dev tools and clear local storage.')
      }else{
        setShowTimer(true)
      }
    }
  }

  if (showTimer) {
    return (
      <TimerFace onExit={() => setShowTimer(false)} obj={obj} startingTimeInSeconds={timerStartTime}  />
    )
  } else {

    return (
      <Fragment>
      <TimerContainerStyle>
        <TimerContainerItem>
          <Icons.Increase display color='green' onClick={() => handleIncrease()} />
        </TimerContainerItem>
        <TimerContainerStyle>
          <Icons.Decrease display color='red' onClick={() => handleDecrease()} />
        </TimerContainerStyle>
        <TimerContainerItem>
          {convertToTimekeepperFormat(getTimeValue())}
        </TimerContainerItem>
        <TimerContainerItem>
          <Icons.Clock display size={getClockSize()} color={getClockColor()} onClick={() => HandleQuickTimeEntry()} />
        </TimerContainerItem>
      </TimerContainerStyle>

      </Fragment>
    )
  }
}

function convertToTimekeepperFormat(current: number) {
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

function TimerFace({ obj, onExit, startingTimeInSeconds = 0}) {
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