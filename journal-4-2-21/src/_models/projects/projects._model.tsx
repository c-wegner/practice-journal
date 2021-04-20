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
}
