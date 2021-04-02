import {Time} from './time'

export class TimeSheet{
    times: {[id: string]: Time} = {}

    get _times(): Time[]{
        return Object.values(this.times)
    }
}