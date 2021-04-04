import React, { createContext, useContext, useEffect, useState } from 'react';
import { Time, TimeSheet, timePath } from "./times";

import firebase, { app } from '../globals/firebase';

export const TimeContext = createContext(new TimeSheet())

export const TimeProvider = ({ children }) => {
  const [entries, setEntries] = useState({})
  const timeSheet= new TimeSheet()

  const loadProjects = () => {
    const db = firebase.firestore(app);

    db.collection(timePath).onSnapshot(function (querySnapshot) {
      timeSheet.times = {}
      querySnapshot.forEach(function (doc) {
        const t = cloneObject(doc.data())
        if (t.lastSave === undefined || t.lastSave === 0) {
          t.lastSave = new Date().getTime()
        }
    
       timeSheet[t.id] = t

      })
      setEntries(timeSheet.times)
    })

  }
  useEffect(() => {
    loadProjects()
  }, [])


  return (
    <TimeContext.Provider value={timeSheet.update(entries)}>
      {children}
    </TimeContext.Provider>

  )
}

function cloneObject(obj: any): Time {
    const temp = new Time();
    for (let p in obj) {
      temp[p] = obj[p];
    }
    return temp;
  }