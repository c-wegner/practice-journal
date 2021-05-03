import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "../firebase";
import { Clients, clientPath, Client } from "./clients._model";

export const ClientsContext = createContext(new Clients())

export const ClientsProvider = ({ children }) => {
  const [clientsData, setClientsData] = useState([])
  const book = new Clients()

  let wegnerStoredTimerData = null;



  const loadClients = () => {
    const db = firebase.firestore(app);

    db.collection(clientPath).onSnapshot(function (querySnapshot) {
      book.clients = [];
      if (localStorage.getItem('wegnerStoredTimerData')) {
        wegnerStoredTimerData = JSON.parse(localStorage.getItem('wegnerStoredTimerData'))
      }
      querySnapshot.forEach(function (doc) {
        const c = cloneClient(doc.data());
        c.hasOpenTime = false;
        c.timerIsRunning = true;
        if (localStorage.getItem('wegnerStoredTimerData')) {
          if(wegnerStoredTimerData.objId===c.id && wegnerStoredTimerData.objType==='contact'){
            c.hasOpenTime = true
            c.timerIsRunning = wegnerStoredTimerData.timerRunning

          }
        }

        c.phone= formatPhoneNumber(c.phone)
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

function getSecondsFromLastTick(lastTick: number){
  let delta = new Date().getTime() - lastTick
  return delta/1000
}

function formatPhoneNumber(pho){
	const l = pho.length;
	let temp = '';	
	for(let i =0; i<l; i++){
		const c = pho[i]
		if(!isNaN(c)){
			temp = temp + c
		}
	}
	
	const tl = temp.length;
	if(tl === 7){
		return temp.substring(0,3) + '-' + temp.substring(3)
	}
	if(tl === 10){
		return '('+temp.substring(0,3)+') ' + temp.substring(3,6) +'-' + temp.substring(6)
	}
	
	if(tl === 11){
		return '+'+ temp.substring(0,1) + ' ('+temp.substring(1,4)+')' + temp.substring(4,7) +'-' + temp.substring(7)
	}
	return pho
}
