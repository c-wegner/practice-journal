import React, { createContext, Fragment, useEffect, useState } from "react";
import { convertToDateString, Time } from "..";
import firebase, { app } from "../firebase";

export const projectPath = 'projects'

const _projectIdLength = 5

export class Project {
    id: string = '';
    projectId: string = '';
    clientId: string = '';
    clientName: string = '';
    clientDisplay: string = '';
    clientShortName: string = '';
    title: string = '';
    open: boolean = true;
    checkInOn: boolean = false;
    notes: string = '';

    billType: string = '';
    billRate: number = 375;
    billTerms: string = '';
    initialEstimate: number = 0;

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
    subTask= '';
    enteredLaneOn: number = 0;

    lastSave: number = 0;

    classType = 'project'

    hasOpenTime: boolean = false;
    timerIsRunning: boolean = false;
    lastTimerUpdate: number = 0;
    timerTime: number = 0;

    totalTime = 0;
    currentTime = 0;

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
        if (this.lastSave === undefined || this.lastSave === 0) {
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

    get active(){
      return this.open
    }

    createNewTimeEntry(timeInSeconds = 0){
      const t = new Time()
      t.projectId = this.id
      t.projectDisplay = this.display
      t.clientId=this.clientId
      t.clientName = this.clientName
      t.clientDisplay = this.clientDisplay
      t.clientShortName= this.clientShortName

    
      if(this.task!==''){
        t.description = this.task
      }else{
        t.description = 'Handled various items for client.'
      }
      t.billTo = convertToDateString(new Date().getTime())
      t.rate = this.billRate
      t.time = Math.round(timeInSeconds*10)/10
      return t
    }

    getCreationDate(){
      const createdOn = new Date(parseInt(this.id))
      const M = MonthArray[createdOn.getMonth()]
      const d = createdOn.getDate()
      let dString = d.toString()
      if(d<10){
        dString='0' + dString
      }
      const y = createdOn.getFullYear()
      const currentYear = new Date().getFullYear()
      let yString = ''
      if(currentYear!==y){
        yString = ', ' + y
      }
      return M + ' ' + dString + yString
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

export const MonthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];