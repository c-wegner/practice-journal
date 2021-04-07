import firebase, { app } from "../globals/firebase";

export const clientPath = 'contacts'

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

    billType: string = '';
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
    lastSave: number = -1;

    _time = {
        current: 0,
        billed: 0,
        paid: 0
    }

    _timer = {
        hasOpenTimer: false,
        timerIsRunning: false,
        totalTime: 0,
        lastTimerUpdate: -1,
    }

    _projects = {
        open: 0,
        closed: 0
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

    get active() {
        return !this.archived;
    }

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

    static billTypes = ["Hourly", "Fixed", "Subscription", "None"];
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