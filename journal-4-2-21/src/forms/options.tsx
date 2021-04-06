import React, { createContext } from 'react';
import { Fragment } from 'react';
import { useState } from 'react';

const initialState = {
  showFirmRelated: false,

  displaySmallCards: false,
  displayLargeCards: false,

  displayActiveClients: true,
  displayAtClientLane: true,
  displayAtThirdPartyLane: true,
}

export const OptionsContext = createContext(initialState)

export const OptionsProvider = ({children})=>{
  const [currentOptions, setCurrentOptions] = useState(initialState)

  return(
    <OptionsContext.Provider value={currentOptions}>
      {children}
    </OptionsContext.Provider>
  )
}


export const OptionsForm = ({})=>{

  return(
    <Fragment>
      Hello
    </Fragment>
  )
}