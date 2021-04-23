import React, { Fragment } from 'react';
import styled from 'styled-components';
import { common } from '../../globals';
import *as Icons from '../icons/_icons.v.2'

const boxShadow = {
  standard: common.values.shadow.standard,
  hover: common.values.shadow.hover
}

export const Styles = {
  Card: styled.div<{ boxShadow: string, opacity: number }> `
    margin: 10px auto;
    width: 97%;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 4px;
    padding: 7px;
    opacity: ${p => p.opacity};
    box-shadow: ${p => p.boxShadow};
    transition: 1s box-shadow;
    &:hover{
      box-shadow: ${boxShadow.hover};
    }
  `,

  Line: styled.div<{ maxHeight: string, justifyContent: string }> `
    max-height: ${p => p.maxHeight};
    display: flex;
    align-items: center;
    transition: max-height .25s;
    overflow: hidden;
    justify-content: ${p => p.justifyContent};
    line-height: 1.5;
  `,

  Title: styled.div<{margin?: string}>`
      cursor: pointer;
      font-weight: 630;
      font-size: 1rem;
      margin:${p=>p.margin};
  `,

  Text: styled.div<{ fontSize?: string; fontWeight?: string, color?: string; justifyContent: string; padding?:string }> `
    display: flex;
    align-items: center;
    font-size: ${p => p.fontSize};
    font-weight: ${p => p.fontWeight};
    color: ${p => p.color};
    padding: ${p=>p.padding};
    flex-grow:1;
    justify-content: ${p => p.justifyContent};
  `,

  IconBoxes: styled.div`
    display: flex;
    align-items: center;
  `,
}

export const Text = ({ children, fontSize = '.9rem', fontWeight = 'inherit', color = 'inherit', right = false, padding='4px 0 0 0' }) => (
  <Styles.Text fontSize={fontSize} fontWeight={fontWeight} color={color} justifyContent={right ? 'flex-end' : 'flex-start'} padding={padding}>
    {children}
  </Styles.Text>
)

export const Card = ({ children, boxShadow = false, opacity = 1 }) => (
  <Styles.Card boxShadow={boxShadow ? common.values.shadow.hover : common.values.shadow.standard} opacity={opacity}>
    {children}
  </Styles.Card>
)

const getMaxHeight = (displayWhenCollapsed: boolean, expanded: boolean) => {
  if (displayWhenCollapsed) { return '7rem' }
  return expanded ? '7rem' : '0'
}

export const Line = ({ displayWhenCollapsed = false, expanded = true, children, justifyContent = 'space-between', onClick = null }) => {
  const handleClick = () => {
    if (onClick !== null && onClick !== undefined) {
      onClick()
    }
  }

  return (
    <Styles.Line maxHeight={getMaxHeight(displayWhenCollapsed, expanded)} justifyContent={justifyContent} onClick={() => handleClick()}>
      {children}
    </Styles.Line>
  )
}

export const Title = ({ children, onClick }) => (
  <Styles.Title onClick={() => onClick()}>
    {children}
  </Styles.Title>
)

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const _DisplayIcons = ({
  archived = false,
  cash = false,
  exclamation = false,
  flag = false,
  phone = false,
  envelopeOpen = false,
  replyAll = false,
}) => {
  return (
    <Styles.IconBoxes>
      &nbsp;
      <Icons.Archive display={archived} margin='0 0 0 5px' size='.8rem'/>
      <Icons.Cash display={cash} color='green' margin='0 0 0 5px' size='.8rem'/>
      <Icons.Phone display={phone} margin='0 0 0 5px' size='.8rem'/>
      <Icons.EnvelopeOpenFill display={envelopeOpen} margin='0 0 0 5px' size='.8rem'/>
      <Icons.ReplyAll display={replyAll}margin='0 0 0 5px'/>
      <Icons.Exclamation display={exclamation} color='red' margin='0 0 0 5px' size='.8rem'/>
      <Icons.Flag display={flag} color='red' margin='0 0 0 5px' size='.8rem'/>
    </Styles.IconBoxes>
  )
}

export const SizeText=(text: string, targetLength= 25)=>{
  const l = text.length
  if(l<targetLength) return text
  let temp = ''
  for(let i=0; i<targetLength-2; i++){
    temp += text[i]
  }
  temp+='...'
  return temp
}