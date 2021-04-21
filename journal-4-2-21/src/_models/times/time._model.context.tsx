import React, { createContext, Fragment, useEffect, useState } from "react";

import firebase, { app } from "../firebase";
import { Time, timePath, convertToDateString } from "./time._model";
import { Times } from "./times._model"
export {Time, Times, convertToDateString, timePath}

export const TimesContext = createContext(new Times())

export const TimesProvider = ({ children }) => {
  const [entries, setEntries] = useState([])
  const timeSheet= new Times()

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
    <TimesContext.Provider value={timeSheet.update(entries)}>
      {children}
    </TimesContext.Provider>

  )
}

function cloneObject(obj: any): Time {
    const temp = new Time();
    for (let p in obj) {
      temp[p] = obj[p];
    }
    return temp;
  }