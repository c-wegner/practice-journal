import React, {useState, useContext, useRef, useEffect} from 'react';
import styled from 'styled-components';


export const useTimekeeper=(isRunning = false, setTimer, startingValueInSeconds = 0)=>{
  const [currentTime, setCurrentTime] = useState(startingValueInSeconds);
 

  useEffect(()=>{
    const timer = setInterval(()=>{
      handleTick()
    }, 1000)

    return ()=>clearInterval(timer)
  })

  const handleTick =()=>{
    if(isRunning){
      setCurrentTime(currentTime=>currentTime + .1)
      setTimer(currentTime=>currentTime + .1)
    }
  }
}