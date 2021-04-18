import React, {createContext, useContext, useState} from 'react';
import { BookDataContext, ListDataContext, SheetDataContext } from '../data';

import { ClientData, ProjectData, TimeData } from "./data.imports";

export class ProjectCard{
  id: string = '';
  clientId: string = '';
  clientDisplay: string = '';
  clientName: string = '';
  clientShortName: string = '';
  title: string = '';
  open: boolean = true;

  lane = '@Wegner Law PLLC'
  
}