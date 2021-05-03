import {Client_Base, clientPath} from './base.client';
export {clientPath}

export class Client_New extends Client_Base{
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