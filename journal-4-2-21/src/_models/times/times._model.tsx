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

  filterEntries(showBilled = false, startDate=0, endDate=new Date().getTime(), client='', showExpenses = true){
    const l = this.times.length
    let temp = []
    for(let i = 0; i<l; i++){
      const t = this.times[i]

      if(!t.billed || showBilled){


          if(client==='' || t.clientDisplay === client){
  
            temp.push(t)
          }
        
      }
    }

 return temp
  }

  getEligableClients(showBilled = false, startDate=0, endDate=new Date().getTime(), client='', showExpenses = true){
    let temp:Time[] = this.filterEntries(showBilled, startDate, endDate,client, showExpenses)

    console.table(temp)   


    let tempClients = []

    const l = temp.length;
    for(let i=0; i<l; i++){
      const t = temp[i]
if(!checkForClient(t.clientDisplay, tempClients)){
  tempClients.push({
    display: t.clientDisplay,
    value: t.clientDisplay,
    active: true
  })
}

 
    }
    return tempClients
  }
}

export const StoreTimerData =()=>{
  
}

function checkForClient(client, priorClients){
  const l= priorClients.length
  for(let i = 0; i<l; i++){
    if(priorClients[i].display===client){
      return true
    }
  }
  return false
}