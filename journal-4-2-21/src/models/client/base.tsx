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
  itemClass: string = 'contact'

  hasOpenTime: boolean =false;
  timerRunning: boolean = true;
  lastTimerUpdate: number =0;
  lastTime: number = 0;

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

  getCurrentTime(){
    return roundNumber(this.currentTime)
  }

  getTotalTime(){
    return roundNumber(this.totalTime)
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

function roundNumber(num: number){
  let temp = Math.round(num*10)
  return temp/10
}