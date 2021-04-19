import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "./firebase";

export const timePath = 'times'

export class TimeData{
    id: string = '';
    clientId: string = '';
    projectId: string = '';
    description: string = '';
    rate: number = 375;
    billable = true;
    time: number = .1;
    billed: boolean = false;

    flagged: boolean = false;

    subscription: boolean = false;
    flatFee: boolean = false;
    expense: boolean = false;

        lastSave: number = -1;

    createdOn: number = -1;
    billTo: string = convertToDateString(new Date().getTime());

    convertToObject() {
        return JSON.parse(JSON.stringify(this));
    }

    save() {
        if (this.lastSave === undefined || this.lastSave === -1) {
            this.id = new Date().getTime().toString()
        }
        this.lastSave = new Date().getTime()
        submitObject(this.convertToObject(), timePath)
    }

    update(propToUpdate, updateValue) {
        updateObject(this, propToUpdate, updateValue, timePath)
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


function convertToDateString(date:number){
  const temp = new Date(date)
  let monthDate = temp.getMonth() + 1
  let monthDateString = monthDate.toString()
  if(monthDate <10){
    monthDateString = '0' + monthDateString
  }

  let dayDate = temp.getDate()
  let dayDateString = dayDate.toString()
  if(dayDate<10){
    dayDateString = '0' + dayDateString
  }
  return temp.getFullYear() + '-' + monthDateString + '-' + dayDateString
}

export class SheetData{
  times: TimeData[];

    update(updatedTime: TimeData[]){
    this.times = []
    const l = updatedTime.length
    for(let i =0; i<l; i++){
      this.times.push(updatedTime[i])
    }
    return this
  }

  addTime(time: TimeData){
    this.times.push(time)
  }

}

export const SheetDataContext = createContext(new SheetData())

export const SheetDataProvider = ({ children }) => {
  const [entries, setEntries] = useState([])
  const timeSheet= new SheetData()

  const loadTimes = () => {
    const db = firebase.firestore(app);

    db.collection(timePath).onSnapshot(function (querySnapshot) {
      timeSheet.times = []
      querySnapshot.forEach(function (doc) {
        const t = cloneObject(doc.data())
        if (t.lastSave === undefined || t.lastSave === 0) {
          t.lastSave = new Date().getTime()
        }

       timeSheet.addTime(t)

      })


      setEntries(timeSheet.times)
    })

  }
  useEffect(() => {
    loadTimes()

    
  }, [])


  return (
    <SheetDataContext.Provider value={timeSheet.update(entries)}>
      {children}
    </SheetDataContext.Provider>

  )
}

function cloneObject(obj: any): TimeData {
    const temp = new TimeData();
    for (let p in obj) {
      temp[p] = obj[p];
    }
    return temp;
  }