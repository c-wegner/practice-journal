import firebase, { app } from "../../_models/firebase";
import {Project_V2} from '../project/project'
import {Projects_V2} from '../project/projects';

export const clientPath = 'contacts_new'

export class Client_Base{
  id: string = '';
  name: string = '';
  useAltName: boolean = false;
  altName: string = '';
  useAltShortName: boolean = false;
  altShortName: string = '';
  isBusiness: boolean= false;
  contact: string = '';
  contactTitle: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  notes: string = '';

  billType: string = '';
  billRate: number = 375;
  billTerms: string = '';
  initialEstimate: number = 0;
  billReminder: boolean = false;

  followUpCall: boolean = false;
  followUpReadEmail: boolean = false;
  followUpSendEmail: boolean = false;
  followUpNotes: string = '';
  hasFollowUpDueDate = false;
  followUpDueDate = '';
  
  archived: boolean = false;
  client: boolean = true;
  prospect: boolean = false;
  flagged: boolean = false;

  currentTime: number = 0;
  totalTime: number = 0;

  currentProjects: number = 0;
  totalProjects: number = 0;

  listOfCurrentProjects: string[] = []

  lastSave: number = 0;
  itemType: string = 'contact'



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


  get display(){
    if(this.useAltName){
      return this.altName
    }

    if(this.isBusiness){
      return this.name
    }

    const fullName = this.name.trim().split(' ')
    const l = fullName.length
    if(l<2){
      return this.name
    }
    const lastName = fullName[l-1]
    return lastName + ', '+ this.name.replace(lastName, '').trim()
  }

  get shortName(){
    if(this.useAltShortName){return this.altShortName}
    const fullName = this.name.trim().split(' ')
    const l = fullName.length
    if(l<2) {return this.name}
    const lastName = fullName[l-1]
    if(this.isBusiness){
      if(checkEnding(lastName)){
        return this.name.replace(lastName,'').trim()
    }else{
      return this.name
      }
    }
    return lastName
  }



  generateProject(list: Projects_V2){
    const temp = list.getNextProject()
    temp.clientId = this.id
    temp.clientDisplay = this.display
    temp.clientName = this.name
    temp.clientShortName = this.shortName
    temp.billType = this.billType
    temp.billRate = this.billRate
    return temp
  }
}

const businessEndings = [".", " LL", " PL", " INC", " CORP", " LTD"];

function checkEnding(str: string): boolean {
  const comp = " " + str.toUpperCase();
  for(let s of businessEndings){

    if(comp.includes(s))return true
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