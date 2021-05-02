import { Project_V2 } from './project'


const _projectIdLength = 5

export class Projects_V2 {
  projects: Project_V2[] = []

  getNextProject() {
    const temp = new Project_V2()

    temp.projectNumber = generateProjectNumber(this.projects.length, _projectIdLength)
    return temp
  }

  static listLanesForDropDown = [
    { value: '@Wegner Law PLLC', display: '@Wegner Law PLLC', active: true },
    { value: '@Client', display: '@Client', active: true },
    { value: '@3rd party', display: '@3rd party', active: true },
    { value: 'On hold', display: 'On hold', active: true },
    { value: 'On deck', display: 'On deck', active: true },
    { value: 'Winding down', display: 'Winding down', active: true }
  ]
}

function generateProjectNumber(num: number, projNumLength = 5){
  let temp = num.toString()
  const l = projNumLength - temp.length
  for(let i=0; i<l; i++){
    temp = '0' + temp
  }
  return temp
}