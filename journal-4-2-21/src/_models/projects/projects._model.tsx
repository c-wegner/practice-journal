import { Clients } from "../clients/clients._model";
import { Times } from "../times/times._model";
import { Project, projectPath } from "./project._model";
export {Project, projectPath}

export class Projects{
  projects: Project[] = []

      update(newProjects): Projects {
        this.projects = []
        const l = newProjects.length;
        for (let i =0; i<l; i++) {
          const p = newProjects[i]
          this.projects.push(p)
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

    getProject(target){
      const l = this.projects.length
      for(let i = 0; i<l; i++){
        const p = this.projects[i]
        if(p.id === target) return p
        if(p.projectId===target) return p
        if(p.display=== target) return p
      }

      return new Project()
    }

    addProject(project){
      this.projects.push(project)
    }

    prepareProjects(book: Clients, sheet: Times){
      const l = this.projects.length
      const tl = sheet.times.length
      for(let i=0; i<l; i++){
        const p= this.projects[i]
        const c = book.getClient(p.clientId)

        p.currentTime = 0;
        p.totalTime = 0;
        p.clientName = c.name
        p.clientDisplay= c.display
        p.clientShortName= c.shortName

        for(let x = 0; x<tl; x++){
          const t = sheet.times[x]
          if(t.projectId===p.id){
            if (t.subscription) {

            } else if (t.flatFee) {
  
            } else if (t.expense) {
  
            } else {
              p.totalTime += t.time
              if (!t.billed) {
                p.currentTime += t.time
              }
            }
          }

        }
        this.projects[i] = p
      }
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
