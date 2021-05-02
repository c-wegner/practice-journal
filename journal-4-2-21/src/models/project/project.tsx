import { Project_Base } from "./project.base";

export class Project_V2 extends Project_Base{
  currentTime: number = 0;
  totalTime: number = 0;

  hasOpenTime: boolean =false;
  timerRunning: boolean = true;
  lastTimerUpdate: number =0;
  lastTime: number = 0;

  
  getCurrentTime(){
    const temp = Math.round(this.currentTime * 10)
    return temp/10
  }

  getTotalTime(){
    const temp = Math.round(this.totalTime * 10)
    return temp/10
  }
}