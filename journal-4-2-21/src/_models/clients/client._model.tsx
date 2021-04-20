import React, { createContext, Fragment, useEffect, useState } from "react";
import firebase, { app } from "../firebase";

const clientPath = 'contacts'

export class Client {
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
  createdOn: number = 0;

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

  get display() {
    if (this.useAltName) {
      return this.altName;
    }
    if (this.isBusiness) {
      return this.name;
    }
    const fullName = this.name.split(" ");
    const l = fullName.length;
    if (l < 2) {
      return this.name;
    }
    const lastName = fullName[l - 1];
    return lastName + ", " + this.name.replace(lastName, "").trim();
  }

  get shortName() {
    if (this.useAltName) {
      return this.altName;
    }
    const fullName = this.name.split(" ");
    const l = fullName.length;
    if (l < 2) {
      return this.name;
    }
    const lastName = fullName[l - 1];
    if (this.isBusiness) {
      if (checkEnding(lastName)) {
        return this.name.replace(lastName, "").trim();
      } else {
        return this.name;
      }
    }
    return lastName;
  }
}

const businessEndings = [".", " LL ", " PA ", " PL ", " INC ", " CORP ", " LTD "];

function checkEnding(str: string): boolean {
  const comp = " " + str.toUpperCase()+ ' ';
  for (let s of businessEndings) {
    if (comp.includes(s)) {
      return true;
    }
  }
  return false;
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

export class Clients {
  clients: Client[] = [];

  getClient(target: string) {
    const l = this.clients.length
    for (let i = 0; i < l; i++) {
      const c = this.clients[i]
      if (c.useAltName && (c.altName === target)) return c
      if (c.name === target) return c
      if (c.display === target) return c
      if (c.shortName === target) return c
      if (c.id === target) return c
    }
    return new Client()
  }


  addClient(client) {
    this.clients.push(client)
  }

  updateClients(updatedClients: Client[]) {
    this.clients = []
    const l = updatedClients.length
    for (let i = 0; i < l; i++) {
      this.clients.push(updatedClients[i])
    }
    return this
  }
}
