import { Clients } from "../clients/clients._model";
import { Projects } from "../projects/projects._model";
import { Time } from "./time._model";

export class Times {
  times: Time[];

  update(updatedTime: Time[]) {
    this.times = []
    const l = updatedTime.length
    for (let i = 0; i < l; i++) {
      this.times.push(updatedTime[i])
    }
    return this
  }

  addTime(time: Time) {
    this.times.push(time)
  }

  prepareTimes(book: Clients, list: Projects) {
    const l = this.times.length
    for (let i = 0; i < l; i++) {
      const t = this.times[i]
      if (true) {
        const c = book.getClient(t.clientId)
        const p = list.getProject(t.projectId)
        t.clientName = c.name
        t.clientDisplay = c.display;
        t.clientShortName = c.shortName
        t.projectDisplay = p.display
      }
      t.time = Math.round(t.time * 10)/10
      this.times[i] = t
    }
  }

  groupTimes(time: any): Time {
    const l = this.times.length
    for (let i = 0; i < l; i++) {
      const t = this.times[i]
      if (t.billTo === time.billTo &&
         t.clientId === time.clientId &&
          t.description === time.description &&
            t.billable === time.billable &&
              t.rate === time.rate &&
           !t.billed) {
            t.time += time.time
            t.lastSave = new Date().getTime()
            return t
      }
    }
    return time
  }

}