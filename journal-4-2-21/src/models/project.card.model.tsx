import React, { createContext, useContext, useState } from 'react';
import { BookDataContext, ListDataContext, SheetDataContext } from '../data';
import { ClientCard } from './client.card.model';

import { ClientData, ProjectData, TimeData } from "./data.imports";

export class ProjectCard {
  id: string = '';
  prjectNumber = '';
  clientId: string = '';
  clientDisplay: string = '';
  clientName: string = '';
  clientShortName: string = '';
  title: string = '';
  open: boolean = true;

  lane = '@Wegner Law PLLC'
  task = '';
  laneContact = '';
  enteredLaneOn = 0;

  notes: string = '';

  billType: string = 'Hourly';
  billRate: number = 375;
  billTerms: string = '';
  billReminder: boolean = false;

  followUpPhone: boolean = false;
  followUpSendEmail: boolean = false
  followUpReadEmail: boolean = false;
  followUpNotes: string = '';

  urgent: boolean = false;
  firmRelated: boolean = false;
  flagged: boolean = false;

  currentBillableTime: number = 0;
  totalBillableTime: number = 0;

  currentExpenses: number = 0;
  totalExpenses: number = 0;

  hasOpenTimer: boolean = false;
  timerIsRunning: boolean = false;
  timeOfLastTimerUpdate: number = 0;
  totalTimerTime: number = 0;



  get display(): string {
    return this.prjectNumber + ' ' + this.title
  }

  static createFromProjectData(project: ProjectData) {
    const temp = new ProjectCard()
    for (let prop in project) {
      temp[prop] = project[prop]
    }
    return temp
  }
}

export class ProjectCards {
  projects: ProjectCard[] = []
  nextProjectNumber: number = 0;

  prepare(projectCards: ProjectCard[], clientCards: ClientCard[], timeSheets: TimeData[]): ProjectCards {
    this.nextProjectNumber = projectCards.length
    this.projects = []
    const l = projectCards.length
    const lt = timeSheets.length
    for(let i =0; i<l; i++){
      const p = projectCards[i]
      const c = findClient(p.clientId, clientCards)
      p.clientName = c.name
      p.clientShortName = c.shortName
      p.clientDisplay = c.display
      for(let x = 0; x<lt; x++){
        const t = timeSheets[x]
        if(t.projectId=== p.id){

        }
      }
    }


    return this
  }
}


function findClient(clientTarget, clientCards: ClientCard[]): ClientCard {
  const l = clientCards.length

  for (let i = 0; i < l; i++) {
    const c = clientCards[i]
    switch (clientTarget) {
      case c.id: return c
      case c.name: return c
      case c.shortName: return c
      case c.display: return c
    }
  }
  return new ClientCard()
}