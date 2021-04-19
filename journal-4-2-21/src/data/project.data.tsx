import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "./firebase";

export const projectPath = 'projects'

const _projectIdLength = 5

export class ProjectData {
    id: string = '';
    projectId: string = '';
    clientId: string = '';
    title: string = '';
    open: boolean = true;
    notes: string = '';

    billType: string = '';
    billRate: number = 375;
    billTerms: string = '';
    initialEstimate: number = -1;

    followUpPhone: boolean = false;
    followUpSendEmail: boolean = false
    followUpReadEmail: boolean = false;
    followUpNotes: string = '';

    billReminder: boolean = false;
    urgent: boolean = false;
    flagged: boolean = false;
    firmRelated: boolean = false;

    lane = '@Wegner Law PLLC';
    laneContact = '';
    task = '';
    enteredLaneOn: number = -1;

    lastSave: number = -1;

    classType = 'project'

    hasOpenTime: boolean = false;
    timerIsRunning: boolean = false;
    lastTimerUpdate: number = 0;
    timerTime: number = 0;

    currentBillableTime: number = 0;
    currentNonBillableTime: number = 0;
    currentExpenses: number = 0;

    totalBillableTime: number = 0;
    totalNonBillableTime: number = 0;
    totalExpenses: number = 0;

    addProjectId(num: number | string) {
        let temp = num.toString()
        const l = _projectIdLength - temp.length;
        for (let i = 0; i < l; i++) {
            temp = '0' + temp
        }

        this.projectId = temp;
    }

    convertToObject() {
        return JSON.parse(JSON.stringify(this));
    }

    save() {
        if (this.lastSave === undefined || this.lastSave === -1) {
            this.id = new Date().getTime().toString()
        }
        this.lastSave = new Date().getTime()
        submitObject(this.convertToObject(), projectPath)
    }

    update(propToUpdate, updateValue) {
        updateObject(this, propToUpdate, updateValue, projectPath)
    }

    get display(): string {
      return this.projectId + ' ' + this.title
    }

 
}

export function submitObject(obj, path) {
    const db = firebase.firestore(app);
    db.collection(path)
        .doc(obj.id)
        .set(obj);
}

export function updateObject(obj, propToUpdate, updateValue, path) {
    console.log(path)
    const db = firebase.firestore(app)
    const lastSaveTime = new Date().getTime()
    let docRef = db.collection(path).doc(obj.id)

    docRef.update({
        [propToUpdate]: updateValue,
        lastSave: lastSaveTime
    })
}

export class ListData{
  projects: ProjectData[] = []

      update(newProjects): ListData {
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

      return new ProjectData()
    }

    addProject(project){
      this.projects.push(project)
    }
}

export const ListDataContext = createContext(new ListData())

export const ListDataProvider=({children})=>{
   const [projects, setProjects] = useState({})

  const list = new ListData()
  

  const loadProjects = () => {
    const db = firebase.firestore(app);

    db.collection(projectPath).onSnapshot(function (querySnapshot) {
      list.projects = [];
      querySnapshot.forEach(function (doc) {
        const p = cloneProject(doc.data())
        if (p.lastSave === undefined || p.lastSave === 0) {
          p.lastSave = new Date().getTime()
        }
    
        list.addProject(p)

      })
      setProjects(list.projects)
    })

  }
  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <ListDataContext.Provider value={list.update(projects)}>
      {children}
    </ListDataContext.Provider>

  )
}

function cloneProject(obj: any): ProjectData {
    const temp = new ProjectData();
    for (let p in obj) {
      temp[p] = obj[p];
    }
    return temp;
  }