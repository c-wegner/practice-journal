import { Projects, TimeSheet } from '.'
import {Client, clientPath} from './client'
export {Client, clientPath}

export class Clients{
  clients: {[id: string]: Client} ={}



  updateClients(clients: {[id:string]: Client}):Clients{
    this.clients = {}
    for(const [k, c] of Object.entries(clients)){
      this.clients[k] = c
    }
    return this
  }


  getClientByName(target: string):Client{
    for(const c of Object.values(this.clients)){
      if(c.useAltName && c.altName === target) {return c}
      if(c.display===target){return c}
      if(c.name=== target){return c}
      if(c.shortName===target){return c}
    }
    return new Client()
  }

  get _clients(): Client[]{
    let temp = Object.values(this.clients)
    temp.sort((x,y)=>compareClients(x,y))
    return temp
  }

  getCurrentClientsForDropDown(includeFirmRelated = false){
    if(includeFirmRelated===false){
    return this._clients.filter(x=>x.active && !x.firmRelated)
    }else{
      return this._clients.filter(x=>x.active)
    }
  }
}

function compareClients(x: Client, y: Client):number{
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