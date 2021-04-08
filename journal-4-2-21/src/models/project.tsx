import firebase, { app } from "../globals/firebase";

export const projectPath = 'projects'

const _projectIdLength = 5

export class Project {
    id: string = '';
    projectId: string = '';
    clientId: string = '';
    clientName: string = '';
    clientDisplay: string = '';
    clientShortName: string = '';
    title: string = '';
    open: boolean = true;
    notes: string = '';

    billType: string = '';
    billRate: number = 375;
    billTerms: string = '';
    initialEstimate: number = -1;

    followUpPhone: boolean = false;
    followUpSendEmail: boolean = false
    followUpReadEmail: boolean = false;
    followUpNotes: string = '';

    billReminder: boolean = false;
    urgent: boolean = false;
    flagged: boolean = false;
    firmRelated: boolean = false;

    lane = '@Wegner Law PLLC';
    laneContact = '';
    task = '';
    enteredLaneOn: number = -1;

    lastSave: number = -1;

    classType = 'project'

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

    addProjectId(num: number | string) {
        let temp = num.toString()
        const l = _projectIdLength - temp.length;
        for (let i = 0; i < l; i++) {
            temp = '0' + temp
        }

        this.projectId = temp;
    }

    convertToObject() {
        return JSON.parse(JSON.stringify(this));
    }

    save() {
        if (this.lastSave === undefined || this.lastSave === -1) {
            this.id = new Date().getTime().toString()
        }
        this.lastSave = new Date().getTime()
        submitObject(this.convertToObject(), projectPath)
    }

    update(propToUpdate, updateValue) {
        updateObject(this, propToUpdate, updateValue, projectPath)
    }

    get display(): string {
        return this.projectId + ' ' + this.title
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
