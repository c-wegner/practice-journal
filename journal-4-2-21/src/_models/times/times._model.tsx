import { Time } from "./time._model";

export class Times{
  times: Time[];

    update(updatedTime: Time[]){
    this.times = []
    const l = updatedTime.length
    for(let i =0; i<l; i++){
      this.times.push(updatedTime[i])
    }
    return this
  }

  addTime(time: Time){
    this.times.push(time)
  }

}