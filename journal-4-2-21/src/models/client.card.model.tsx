import React, { createContext, useContext, useState } from 'react';
import { BookDataContext, ListDataContext, SheetDataContext } from '../data';

import { ClientData, ProjectData, TimeData } from "./data.imports";

export class ClientCard {
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

  billType: string = 'Hourly';
  billRate: number = 375;
  billTerms: string = '';
  billReminder: boolean = false;

  followUpPhone: boolean = false;
  followUpSendEmail: boolean = false
  followUpReadEmail: boolean = false;
  followUpNotes: string = '';

  archived: boolean = false;
  firmRelated: boolean = false;
  prospect: boolean = false;
  flagged: boolean = false;

  currentProjects: number = 0;
  totalProjects: number = 0;

  openProjects: string[] = []

  currentBillableTime: number = 0;
  totalBillableTime: number = 0;

  currentExpenses: number = 0;
  totalExpenses: number = 0;

  hasOpenTimer: boolean = false;
  timerIsRunning: boolean = false;
  timeOfLastTimerUpdate: number = 0;
  totalTimerTime: number = 0;

  hasUrgentProject = false;

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

  get active() {
    return !this.archived;
  }


  static createFromClient(client: ClientData) {
    const temp = new ClientCard()
    for (let prop in client) {
      temp[prop] = client[prop]
    }
    return temp
  }
}

export class ClientCards {
  clients: ClientCard[] = []

  prepare(book: ClientData[], list: ProjectData[], sheet: TimeData[]): ClientCards {
    const l = book.length;
    const listLength = list.length
    const sheetLength = sheet.length
    for (let i = 0; i < l; i++) {
      const c = ClientCard.createFromClient(book[i])

      for (let x = 0; x < listLength; x++) {
        const p = list[x]
        if (p !== undefined && p !== null) {
          if (p.clientId === c.id) {
            c.totalProjects++
            if (p.open) {
              c.currentProjects++;
              c.openProjects.push(p.display)
              if (p.followUpPhone) {
                c.followUpPhone = true
              }

              if (p.followUpReadEmail) {
                c.followUpReadEmail = true
              }

              if (p.followUpSendEmail) {
                c.followUpSendEmail = true
              }

              if (p.urgent) {
                c.hasUrgentProject = true
              }

              if (p.flagged) {
                c.flagged = true
              }
            }
          }
        }
      }

      for (let y = 0; y < sheetLength; y++) {
        const t = sheet[y]
        if (t !== undefined && t !== null) {
          if (t.clientId === c.id) {
            if (t.expense) {
              c.totalExpenses += t.rate
            } else {
              c.totalBillableTime += t.time
            }
            if (!t.billed) {
              c.currentProjects += t.time
              c.currentExpenses += t.rate
            }
          }
        }
      }
      this.clients.push(c)
    }
    return this
  }

  getClientCard(target: string):ClientCard{
    const l = this.clients.length
    for(let i=0; i<l; i++){
      const c = this.clients[i]
      if(c.useAltName && (c.altName===target)) return c
      if(c.name===target) return c
      if(c.display===target) return c
      if(c.shortName===target) return c
      if(c.id === target) return c
    }
    return new ClientCard()
  }
}

const businessEndings = [".", " LL", " PA", " PL", " INC", " CORP", " LTD"];

function checkEnding(str: string): boolean {
  const comp = " " + str.toUpperCase();
  for (let s of businessEndings) {
    if (comp.includes(s)) {
      return true;
    }
  }
  return false;
}

export const ClientCardsContext = createContext(new ClientCards())

export const ClientCardProvider = ({ children }) => {
  const cardBook = new ClientCards()

  const [clientCards, setClientCards] = useState([])

  const bookData = useContext(BookDataContext)
  const listData = useContext(ListDataContext)
  const sheetData = useContext(SheetDataContext)

  return (
    <ClientCardsContext.Provider value={cardBook.prepare(bookData.clients, listData.projects, sheetData.times)}>
      {children}
    </ClientCardsContext.Provider>
  )
}