export class Client{
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

  lastSave: number = 0;
  itemClass: string = 'contact'
}