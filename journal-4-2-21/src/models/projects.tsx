import { Project, projectPath } from './project';
import { Clients, Client } from './clients'

export { Project, projectPath }

export class Projects {
    projects: { [id: string]: Project } = {}

    update(projects: { [id: string]: Project }, book: Clients): Projects {
        this.projects = {}
        for (const [k, p] of Object.entries(projects)) {
            const c = book.clients[p.clientId]
            if (c !== undefined) {

                p.clientDisplay = c.display;
                p.clientName = c.name;
                p.clientShortName = c.shortName;
                this.projects[k] = p
            }
        }
        return this
    }

    getNextProjectId(projectIdLength = 5): string {
        let temp = Object.values(this.projects).length.toString()
        const l = projectIdLength - temp.length
        for (let i = 0; i < l; i++) {
            temp = '0' + temp
        }
        return temp
    }

    get _projects(): Project[] {
        let temp = Object.values(this.projects)
        temp.sort((x, y) => compareProjects(x, y))
        return temp
    }


    getClientInformation(clientId: string) {
        const clientInformation = {
            currentProjects: 0,
            totalProjects: 0
        }
        for (let p in this.projects) {
            const project = this.projects[p]
            if (project.clientId === clientId) {
                clientInformation.totalProjects = clientInformation.totalProjects + 1
                if (project.open) {
                    clientInformation.currentProjects = clientInformation.currentProjects + 1
                }
            }
        }
        return clientInformation
    }

    filterProjects(filter = '') {
        switch (filter) {
            default:
                return this._projects.filter(x => x.open && !x.firmRelated)
        }
    }

    getProjectsForDropDown(clientId = '', includeFirmRelated = false){
      if(clientId===''){
        return this._projects.filter(x=>x.open)
      }else{
        return this._projects.filter(x=>x.open && x.clientId === clientId)
      }
    }

    getProjectByDisplay(projectDisplay){
      let l = this._projects.length
      for(let i=0; i<l; i++){
        if(this._projects[i].display===projectDisplay) return this._projects[i]
      }
      return new Project()
    }

    prepareClient(clientId){
      const temp = {open: 0, closed: 0}
      for(let p of this._projects){
        if(p.clientId === clientId){
          if(p.open){
            temp.open ++
          }else{
            temp.closed ++
          }
        }
      }
      return temp
    }

    getProjectByLane(laneId='', includeClosedProjects= false, includeFirmRelatedProjects = false){
      let temp: Project[] = []
      for(let p of this._projects){
        if(p.lane === laneId && p.open && !p.firmRelated){
          temp.push(p)
        }
      }
      return temp
    }

    static listLanesForDropDown = [
        { value: '@Wegner Law PLLC', display: '@Wegner Law PLLC', active: true },
        { value: '@Client', display: '@Client', active: true },
        { value: '@3rd party', display: '@3rd party', active: true },
        { value: 'On hold', display: 'On hold', active: true },
        { value: 'On deck', display: 'On deck', active: true },
        {value: 'Winding down', display: 'Winding down', active: true}
    ]
}

function compareProjects(x: Project, y: Project) {
    if (x.projectId === undefined || x.projectId === '') return 1
    if (y.projectId === undefined || y.projectId === '') return -1
    return x.projectId.localeCompare(y.projectId)
}