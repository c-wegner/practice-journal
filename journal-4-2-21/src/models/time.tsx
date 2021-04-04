import firebase, { app } from "../globals/firebase";

export const timePath = 'time'

export class Time{
    id: string = '';
    clientId: string = '';
    _clientName: string = ''
    _clientDisplay: string = ''
    _clientShortName: string = ''
    projectId: string = '';
    description: string = '';
    rate: number = 375;
    quantity: number = .1;
    billed: boolean = false;
    billedOn: number = -1;
    paid: boolean = false;
    paidOn: number = -1;
    voided: boolean = false;
    flagged: boolean = false;
    
    lastSave: number = -1;

    createdOn: number = -1;
    billTo: number = -1;

    convertToObject() {
        return JSON.parse(JSON.stringify(this));
    }

    save() {
        if (this.lastSave === undefined || this.lastSave === -1) {
            this.id = new Date().getTime().toString()
        }
        this.lastSave = new Date().getTime()
        submitObject(this.convertToObject(), timePath)
    }

    update(propToUpdate, updateValue) {
        updateObject(this, propToUpdate, updateValue, timePath)
    }
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
