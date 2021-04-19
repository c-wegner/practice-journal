import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { BookData, BookDataContext, ClientData, ListData, ListDataContext, ProjectData, SheetData, SheetDataContext, TimeData } from "../data";

export class TimeCard{
  id='';
  clientId = '';
  clientName = '';
  clientDisplay = ''
  clientShortName = ''
  projectId = '';
  projectNumber = '';
  projectTitle = '';

  description = '';
  rate = 1;
  time =0;
  entryDate =0;

  expense: boolean = false;
  fixedFee: boolean = false;
  subscription = false;

  billable = true;
  billed = false;
  billedOn = 0;

}

export class TimeCards{
  entries: TimeCard[]

  prepare(timeData: SheetData, bookData: BookData, listData: ListData){
    if(timeData.times=== undefined) return new TimeCards()
    const l = timeData.times.length
    for(let i =0; i<l; i++){
      const t = timeData.times[i]
      const c = bookData.getClient(t.id);
      const p = listData.getProject(t.clientId)

      const te = cloneObject(t)

      te.clientDisplay = c.display
      te.clientShortName = c.shortName
      te.clientName = c.name

      te.projectNumber = p.projectId
      te.projectTitle = p.title

      this.entries[i] = te
    }
    return this

  }
}

function cloneObject(obj: any): TimeCard {
  const temp = new TimeCard();
  for (let p in obj) {
    temp[p] = obj[p];
  }
  return temp;
}

export const TimeCardsContext = createContext(new TimeCards())

export const TimeCardsProvider = ({ children }) => {
  const cardSheet = new TimeCards()

  const [timeCards, setTimeCards] = useState(new SheetData())

  const bookData = useContext(BookDataContext)
  const listData = useContext(ListDataContext)
  const sheetData = useContext(SheetDataContext)

  return (
    <TimeCardsContext.Provider value={cardSheet.prepare(timeCards, bookData, listData)}>
      {children}
    </TimeCardsContext.Provider>
  )
}