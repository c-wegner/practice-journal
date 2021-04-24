import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "../firebase";
import { Clients, clientPath, Client } from "./clients._model";

export const ClientsContext = createContext(new Clients())

export const ClientsProvider = ({ children }) => {
  const [clientsData, setClientsData] = useState([])
  const book = new Clients()

  let wegnerTimerData = null;

  if (localStorage.getItem('wegnerTimerData')) {
    wegnerTimerData = JSON.parse(localStorage.getItem('wegnerTimerData'))
  }

  const loadClients = () => {
    const db = firebase.firestore(app);

    db.collection(clientPath).onSnapshot(function (querySnapshot) {
      book.clients = [];
      querySnapshot.forEach(function (doc) {
        const c = cloneClient(doc.data());
        c.timerIsRunning = false;
        if (localStorage.getItem('wegnerTimerData')) {
          if(wegnerTimerData.objId===c.id && wegnerTimerData.objType==='contact'){
            c.timerIsRunning = true
          }
        }
        book.addClient(c)
      });
      setClientsData(book.clients);

    });
  };
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <ClientsContext.Provider value={book.loadClients(clientsData)}>
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