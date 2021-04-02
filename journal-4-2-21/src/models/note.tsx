export const notePath = 'notes'

export class Note{
    id: string = '';
    clientId: string ='';
    projectId: string = '';
    noteType: string = '';
    takenAt: number = -1;
    parties: string[] = []
    phone: string = '';
    subject: string = '';
    body: string = '';

    flagged: boolean = false;
    urgent: boolean = false;
    
    followUpPhone: boolean = false;
    followUpSendEmail: boolean = false
    followUpReadEmail: boolean = false;
    followUpNotes: string = '';

    archived: boolean = false;
    deleted: boolean = false;
}

export class Notes{
    notes: {[id: string]: Note}
}


export const quickTaskPath = 'tasks'

export class QuickTask{
    id: string = '';
    clientId: string ='';
    projectId: string = '';
    task: string = '';
    complete: boolean = false;
    notes: string = '';
    
    extremelyUrgent: boolean =false;
    urgent: boolean = false;
    flagged: boolean = false;

    hasReminder: boolean = false;
    reminderOn: number = -1;
}

export class ToDoList{
    tasks: {[id: string]: QuickTask}
}