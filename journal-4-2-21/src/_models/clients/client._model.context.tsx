import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "../firebase";
import { Clients } from "./clients._model";

export const ClientsContext = createContext(new Clients())

export const BookDataProvider = ({ children }) => {
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
        book.addClient(c)
      });
      setClientsData(book.clients);

    });
  };
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <BookDataContext.Provider value={book.updateClients(clientsData)}>
      {children}
    </BookDataContext.Provider>
  );
};

function cloneClient(obj: any): ClientData {
  const temp = new ClientData();
  for (let p in obj) {
    temp[p] = obj[p];
  }
  return temp;
}