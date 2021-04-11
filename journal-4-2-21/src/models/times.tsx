import {Time, timePath} from './time'
export {Time, timePath}

export class TimeSheet{
    times: {[id: string]: Time} = {}

    get _times(): Time[]{
        return Object.values(this.times)
    }

    update(entries:{[id: string]: Time}){
      this.times = {}
      for (const [k, p] of Object.entries(entries)) {
        this.times[k] = p
      }
      return this
    }

    prepareClient(clientId){
      const temp = {currentHours: 0, outsandingHours: 0, totalHours:0, nonBillableHours: 0}
      for(let t of this._times){
        if(t.clientId === clientId){
          
        }
      }
    }
}