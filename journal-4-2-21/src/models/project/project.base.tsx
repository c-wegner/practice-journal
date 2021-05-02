import firebase, { app } from "../firebase";

export const projectPath = 'projects_new'


export class Project_Base {
  id: string = '';
  projectNumber: string = '';
  clientId: string = '';
  clientName: string = '';
  clientDisplay: string = '';
  clientShortName: string = '';
  projectHasDueDate: boolean = false;
  projectDueDate: string = ''

  title: string = '';
  open: boolean = true;
  opendOn: number = 0;
  closedOn: number = 0;

  lane: string = ''
  laneContact: string = '';
  task: string = ''
  taskStarted: number = 0;
  taskHasDueDate: boolean = false;
  taskDueDate: string = ''

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



  lastSave: number = 0;
  itemType = 'project'

  convertToObject() {
    return JSON.parse(JSON.stringify(this));
  }

  save() {
    if (this.lastSave === undefined || this.lastSave === 0) {
      this.id = new Date().getTime().toString()
    }
    this.lastSave = new Date().getTime()
    submitObject(this.convertToObject(), projectPath)
  }

  update(propToUpdate, updateValue) {
    updateObject(this, propToUpdate, updateValue, projectPath)
  }

}

function roundNumber(num: number) {
  let temp = Math.round(num * 10)
  return temp / 10
}

export function submitObject(obj, path) {
  const db = firebase.firestore(app);
  db.collection(path)
    .doc(obj.id)
    .set(obj);
}

export function updateObject(obj, propToUpdate, updateValue, path) {
  console.log(path)
  const db = firebase.firestore(app)
  const lastSaveTime = new Date().getTime()
  let docRef = db.collection(path).doc(obj.id)

  docRef.update({
    [propToUpdate]: updateValue,
    lastSave: lastSaveTime
  })
}

export const MonthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];