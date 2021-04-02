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

                p._clientDisplay = c.display;
                p._clientName = c.name;
                p._clientShortName = c.shortName;
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

    static listLanesForDropDown = [
        { value: '@Wegner Law PLLC', display: '@Wegner Law PLLC', active: true },
        { value: '@Client', display: '@Client', active: true },
        { value: '@3rd party', display: '@3rd party', active: true },
        { value: 'On hold', display: 'On hold', active: true },
        { value: 'On deck', display: 'On deck', active: true }
    ]
}

function compareProjects(x: Project, y: Project) {
    if (x.projectId === undefined || x.projectId === '') return 1
    if (y.projectId === undefined || y.projectId === '') return -1
    return x.projectId.localeCompare(y.projectId)
}