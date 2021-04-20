import { Client, clientPath } from "./client._model";

export {Client, clientPath}

export class Clients{
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

  prepareCards(){
    
  }
}