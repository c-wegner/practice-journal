import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import styled from 'styled-components'
import { PivotStyles } from './pivit.styles';

const initialState = {
  options: [],
  current: '',
  addOption: null,
  reset: null
}

export const PivotContext = createContext(initialState)

export const PivotProvider = ({ children }) => {
  const [options, setOptions] = useState([])
  const [current, setCurrent] = useState('')

  const context = {
    options: options,
    current: current,
    addOption: (opt) => {
      if (!options.includes(opt)) {
        options.push(opt)
        setOptions(options)
        setCurrent(options[0])
      }

    },
    reset: () => setCurrent(options[0])
  }

  const handleMenuClick = (sel: string) => {
    setCurrent(sel)
  }

  return (
    <PivotContext.Provider value={context}>
      <PivotStyles.Stage>
        <PivotMenu
          options={options}
          current={current}
          onClick={handleMenuClick}
        />
        {children}
      </PivotStyles.Stage>

    </PivotContext.Provider>
  )
}

const PivotMenu = ({ options = [], onClick, current }) => {
  return (
    <PivotStyles.MenuBar>
      {
        options.map(x => (
          <PivotStyles.MenuOption
            color={x === current ? 'red' : 'blue'}
            borderColor={x == current ? 'red' : 'white'}
            onClick={() => onClick(x)}
            key={x}
          >
            {x}
          </PivotStyles.MenuOption>
        ))
      }
    </PivotStyles.MenuBar>
  )
}

const PivotPageStyle = styled.div <{ display: string }> `
  display: ${p => p.display};
  flex-direction: column;
  align-items: flex-start;

`

export const PivotPage = ({ id, children }) => {
  const pivotContext = useContext(PivotContext)

  useEffect(() => {
    pivotContext.addOption(id)
  }, [])

  const getDisplay = () => {
    if (id === pivotContext.current) {
      return 'flex'
    } else {
      return 'none'
    }
  }

  return (
    <PivotPageStyle display={getDisplay()}>
      {children}

    </PivotPageStyle>
  )
}