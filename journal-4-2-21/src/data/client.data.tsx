import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "./firebase";

const clientPath = 'contacts'

export class ClientData{
    id: string = '';
    name: string = '';
    useAltName: boolean = false;
    altName: string = '';
    isBusiness: boolean = true;
    contact: string = '';
    contactTitle: string = '';
    phone: string = '';
    email: string = '';
    address: string = '';
    notes: string = '';

    relatedPersons: string[] = [];
    relatedCompanies: string[] = [];

    billType: string = 'Hourly';
    billRate: number = 375;
    billTerms: string = '';
    initialEstimate: number = 0;

    followUpPhone: boolean = false;
    followUpSendEmail: boolean = false
    followUpReadEmail: boolean = false;
    followUpNotes: string = '';

    archived: boolean = false;
    firmRelated: boolean = false;
    prospect: boolean = false;
    flagged: boolean = false;
    billReminder: boolean = false;

    classType: string = 'contact'
    lastSave: number = 0;
    createdOn: number= 0;

    hasOpenTime: boolean = false;
    timerIsRunning: boolean = false;
    lastTimerUpdate: number = 0;
    timerTime: number = 0;

    convertToObject() {
        return JSON.parse(JSON.stringify(this));
    }

    save() {
        if (this.id === undefined || this.id === "") {
            this.id = new Date().getTime().toString();
        }
        this.lastSave = new Date().getTime();
        submitObject(this.convertToObject(), clientPath);
    }

    edit(prop: string, val: string) {
        editObject(this, prop, val, clientPath)
    }
}

export function submitObject(obj, path) {
    const db = firebase.firestore(app);
    db.collection(path)
        .doc(obj.id)
        .set(obj);
}

export function editObject(obj, propToUpdate, newPropValue, path) {
    const db = firebase.firestore(app);
    db.collection(path)
        .doc(obj.id)
        .update({
            [propToUpdate]: newPropValue
        });
}

export class BookData{
  clients: ClientData[] = [];

  addClient(client){
    this.clients.push(client)
  }

  updateClients(updatedClients: ClientData[]){
    this.clients = []
    const l = updatedClients.length
    for(let i =0; i<l; i++){
      this.clients.push(updatedClients[i])
    }
    return this
  }
}

export const BookDataContext = createContext(new BookData())

export const BookDataProvider = ({children})=>{
  const [clientsData, setClientsData] = useState([])
  const book = new BookData()

    let wegnerTimerData = null;

  if(localStorage.getItem('wegnerTimerData')){
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
      console.table(book)
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