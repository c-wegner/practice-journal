
import React, { useContext } from "react";
import {ClientData, BookData, BookDataProvider, BookDataContext} from './client.data'
import {ProjectData, ListData, ListDataProvider, ListDataContext} from './project.data'
import {TimeData, SheetData, SheetDataProvider, SheetDataContext} from './time.data'

export{ClientData, BookData, ProjectData, ListData, TimeData, SheetData, BookDataContext, ListDataContext, SheetDataContext}

export const DataProviders=({children})=>(
  <BookDataProvider>
    <ListDataProvider>
      <SheetDataProvider>
        {children}
      </SheetDataProvider>
    </ListDataProvider>
  </BookDataProvider>
)