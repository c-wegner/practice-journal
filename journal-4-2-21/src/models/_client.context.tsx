import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "../globals/firebase";
import {Client, Clients, clientPath} from './clients';

export { Client, Clients };

export const ClientsContext = createContext(new Clients());



export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState({});
  const book = new Clients();
  let wegnerTimerData = null;



  if(localStorage.getItem('wegnerTimerData')){
    wegnerTimerData = JSON.parse(localStorage.getItem('wegnerTimerData'))
  }


  const loadClients = () => {
    const db = firebase.firestore(app);

    db.collection(clientPath).onSnapshot(function (querySnapshot) {
      book.clients = {};
      querySnapshot.forEach(function (doc) {
        const c = cloneClient(doc.data());
        if(objHasOpenTimer(c, wegnerTimerData)){
          c._timer.hasOpenTimer = true
          c._timer.timerIsRunning = wegnerTimerData.timerStatus;
          c._timer.totalTime = wegnerTimerData.totalRecordedTimeInSeconds;
          c._timer.lastTimerUpdate = wegnerTimerData.lastUpdate
        }else{
          c._timer.hasOpenTimer = false;
          c._timer.timerIsRunning = false;
          c._timer.totalTime = 0;
          c._timer.lastTimerUpdate = 0;
        }

        c._projects.open = 0;
        c._projects.closed = 0;
  
        book.clients[c.id] = c;
      });
      setClients(book.clients);

    });
  };
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <ClientsContext.Provider value={book.updateClients(clients)}>
      {children}
    </ClientsContext.Provider>
  );
};

function cloneClient(obj: any): Client {
  const temp = new Client();
  for (let p in obj) {
    temp[p] = obj[p];
  }
  return temp;
}


function objHasOpenTimer(obj, timerData){
  if(timerData){
    if(timerData.objType===obj.classType){
      if(obj.id===timerData.objId){
        return true
      }
    }
  }
  return false
}