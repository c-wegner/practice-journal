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
}