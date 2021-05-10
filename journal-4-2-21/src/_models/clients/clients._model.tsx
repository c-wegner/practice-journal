import { Projects } from "../projects/projects._model";
import { Times } from "../times/times._model";
import { Client, clientPath } from "./client._model";

export { Client, clientPath }

export class Clients {
  clients: Client[] = [];

  getClient(target: string) {
    const l = this.clients.length
    for (let i = 0; i < l; i++) {
      const c = this.clients[i]
      if (c.useAltName && (c.altName === target)) return c
      if (c.name === target) return c
      if (c.display === target) return c
      if (c.shortName === target) return c
      if (c.id === target) return c
    }
    return new Client()
  }

  addClient(client) {
    this.clients.push(client)
  }

  loadClients(clientsToLoad: Client[]) {
    this.clients = []
    const l = clientsToLoad.length
    for (let i = 0; i < l; i++) {
      this.clients.push(clientsToLoad[i])
    }
    return this
  }

  prepareCards(list: Projects, sheet: Times) {
    const l = this.clients.length
    const pl = list.projects.length
    const tl = sheet.times.length
    for (let i = 0; i < l; i++) {
      const c = this.clients[i]
      c.totalProjects = 0
      c.currentProjects =0
      c.openProjects=[]
      for (let x = 0; x < pl; x++) {
        const p = list.projects[x]
        if (p.clientId === c.id) {
          c.totalProjects++;
          if (p.open) {
            if(p.lane==='On hold' || p.lane==='Winding down'){

            }else{
            c.currentProjects++
            c.openProjects.push(p.display)
            }
          }
        }
      }

      c.currentTime = 0;
      c.totalTime = 0;
      for (let y = 0; y < tl; y++) {
        const t = sheet.times[y]
        if (t.clientId === c.id) {
          if (t.subscription) {

          } else if (t.flatFee) {

          } else if (t.isExpense) {

          } else {
            c.totalTime += t.time
            if (!t.billed) {
              c.currentTime += t.time
            }
          }
        }
      }
      this.clients[i] = c
    }
    this.clients.sort((x,y)=>compareClients(x,y))
  }

  updateProjectTime(clientId, time){
  
    const l =  this.clients.length
    for(let i =0; i<l; i++){
      const c = this.clients[i]
      if(c.id === clientId){
        this.clients[i].currentTime+= time
      }
    }
  }

  getFilteredCards(filterBy = 'Current clients'){
    switch(filterBy){
      case 'Current clients': return this.clients.filter(x=>{
        if(x.archived || x.firmRelated || x.prospect){
          return false
        }
        return true
      })

      case 'Active clients': return this.clients.filter(x=>x.currentProjects>0 && !x.firmRelated)
      case 'Clients with billables': return this.clients.filter(x=>x.currentTime >0)
      case 'All clients': return this.clients
    }
  }
}

function compareClients(x:Client, y:Client){
  if(x.firmRelated && y.firmRelated){
    return x.display.localeCompare(y.display)
  }

  if(x.firmRelated){
    return 1
  }

  if(y.firmRelated){
    return -1
  }

  return x.display.localeCompare(y.display)
}
