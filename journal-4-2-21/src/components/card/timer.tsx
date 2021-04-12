import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import styled from "styled-components";
import * as Icons from "../icons";
import { Client, ClientsContext, Project } from "../../models";

import { useTimekeeper } from "./usetimer";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimerBox = styled.div`
  display: flex;
  width: 1.3rem;
  align-items: center;
  justify-content: center;
`;

interface ITimekeeper {
  obj: Client | Project;
  onExit: any;
  context?: any;
}

export const Timer: React.FC<ITimekeeper> = ({
  obj,
  onExit,
  context = null
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const book = useContext(ClientsContext);

  let timerTime = useTimekeeper(timerRunning, setCurrentTime, obj._timer.totalTime);

  useEffect(() => {
    if (obj._timer.hasOpenTimer) {
      setTimerRunning(obj._timer.timerIsRunning);
      setCurrentTime(obj._timer.totalTime)
    }else{
      setTimerRunning(true)
    }
  },[]);

  const handleRecord = () => {
    if(!timerRunning){
    localStorage.removeItem("wegnerTimerData");
    obj.resetTimer()
    if (obj.classType === "project") {
      const cid = obj["clientId"];
      const c = book.clients[cid];

      c._projectTime = c._projectTime + convertSecondsToHours(timerTime);
      c.save();

      obj.addTime(convertSecondsToHours(timerTime));
      obj.save();
    } else {
      obj.addTime(convertSecondsToHours(timerTime));
      obj.save();
    }
    }
  };

  const handlePlay = () => {
    setTimerRunning(true);
  };

  const handleCancel = () => {
    localStorage.removeItem("wegnerTimerData");
    setTimerRunning(false);
    onExit();
  };

  const handlePause = () => {
    setTimerRunning(false);
    const timerData = {
      objId: obj.id,
      objType: obj.classType,
      totalRecordedTimeInSeconds: currentTime,
      timerStatus: false,
      lastUpdate: new Date().getTime()
    };
    localStorage.setItem("wegnerTimerData", JSON.stringify(timerData));
  };

  const getPlayIcon = () => {
    if (timerRunning) {
      return (
        <Icons.Pause
          size="1.2rem"
          margin="0 2px"
          onClick={() => handlePause()}
          display={true}
          color="red"
        />
      );
    } else {
      return (
        <Icons.Play
          size="1.2rem"
          margin="0 2px"
          onClick={() => handlePlay()}
          display={true}
          color="green"
        />
      );
    }
  };

  if (timerRunning) {
    const timerData = {
      objId: obj.id,
      objType: obj.classType,
      totalRecordedTimeInSeconds: currentTime,
      timerStatus: timerRunning,
      lastUpdate: new Date().getTime()
    };
 localStorage.setItem("wegnerTimerData", JSON.stringify(timerData));
  }

  return (
    <Fragment>
      <Container>
        <Icons.Record
          size="1.2rem"
          margin="0 2px"
          onClick={() => handleRecord()}
          display={true}
          color={timerRunning? 'lightgrey': 'green'}
        />
        {getPlayIcon()}
        <ClockFace seconds={currentTime} />
        <TimerBox>
          <Icons.Cancel
            size="1.2rem"
            margin="0 2px"
            onClick={() => handleCancel()}
            display={true}
          />
        </TimerBox>
      </Container>
    </Fragment>
  );
};

const ClockFaceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getClockValues = (time: number) => {
  let seconds = time;
  let minutes = Math.floor(time / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let showSeperator = true;
  if (seconds % 2 !== 0) {
    showSeperator = false;
  }

  let tempMinutes = minutes.toString();

  if (minutes < 10) {
    tempMinutes = "0" + minutes;
  }

  let tempSeconds = seconds.toString();
  if (seconds < 10) {
    tempSeconds = "0" + seconds;
  }

  return {
    hours: hours,
    minutes: tempMinutes,
    seconds: tempSeconds,
    showSeperator: showSeperator
  };
};

const convertSecondsToHours = (sec: number) => {
  let temp = sec / 60;
  temp = temp / 60;
  temp = Math.round(temp * 10);
  temp = temp / 10;
  temp = temp + 0.1;
  return temp;
};

const ClockSeperatorStyle = styled.div<{ showing: boolean }>`
  color: ${p => (p.showing ? "red" : "white")};
`;

const ClockFace = ({ seconds }) => {
  const clockTime = getClockValues(seconds);

  return (
    <ClockFaceContainer>
      {clockTime.hours}
      <ClockSeperatorStyle showing={clockTime.showSeperator}>
        :
      </ClockSeperatorStyle>
      {clockTime.minutes}.{clockTime.seconds}
    </ClockFaceContainer>
  );
};
