import React from 'react';
import styled from 'styled-components';
import { common } from '../../globals';
import *as Icons from '../icons'

const boxShadow = {
  standard: common.values.shadow.standard,
  hover: common.values.shadow.hover
}

export const Styles = {
  Card: styled.div<{boxShadow:string, opacity: number}> `
    margin: 10px auto;
    width: 97%;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 4px;
    padding: 4px 0 7px 0;
    opacity: ${p=>p.opacity};
    box-shadow: ${p=>p.boxShadow};
    transition: 1s box-shadow;
    &:hover{
      box-shadow: ${boxShadow.hover};
    }
  `,

  Line: styled.div<{maxHeight: string, justifyContent: string}> `
    max-height: ${p=>p.maxHeight};
    display: flex;
    align-items: center;
    transition: max-height .25s;
    overflow: hidden;
    justify-content: ${p=>p.justifyContent};
    line-height: 1.5;
  `,

  Title: styled.div `
      cursor: pointer;
      font-weight: 630;
      padding: 0 7px 2px 7px;
      font-size: 1.1rem;
  `,

  Text: styled.div<{fontSize?: string; fontWeight?:string, color?:string, justifyContent: string}> `
    display: flex;
    align-items: center;
    font-size: ${p=>p.fontSize};
    font-weight: ${p=>p.fontWeight};
    color: ${p=>p.color};
          padding: 2px 7px;
          flex-grow:1;
          justify-content: ${p=>p.justifyContent};
  `,

  IconBoxes: styled.div `
    display: flex;
    align-items: center;
    margin-right: 7px;
  `,
}

export const Text =({children, fontSize='.9rem', fontWeight = 'inherit', color='inherit', right= false})=>(
  <Styles.Text fontSize={fontSize} fontWeight={fontWeight} color={color} justifyContent={right? 'flex-end': 'flex-start'}>
    {children}
  </Styles.Text>
)

export const Card=({children, boxShadow=false, opacity=1})=>(
  <Styles.Card boxShadow={boxShadow? common.values.shadow.hover : common.values.shadow.standard} opacity={opacity}>
    {children}
  </Styles.Card>
)

const getMaxHeight=(displayWhenCollapsed: boolean, expanded: boolean)=>{
  if(displayWhenCollapsed) {return '7rem'}
  return expanded? '7rem' : '0'
}

export const Line=({displayWhenCollapsed = false, expanded = true, children, justifyContent='space-between', onClick=null})=>{
  const handleClick=()=>{
    if(onClick!==null && onClick!==undefined){
      onClick()
    }
  }

  return(
    <Styles.Line maxHeight={getMaxHeight(displayWhenCollapsed, expanded)} justifyContent={justifyContent} onClick={()=>handleClick()}>
    {children}
  </Styles.Line>
  )
}

export const Title = ({children, onClick})=>(
  <Styles.Title onClick={()=>onClick()}>
    {children}
  </Styles.Title>
)

export const IconBox = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
`

export const DisplayIcons=({
  archived = false,
  cash = false,
  exclamation = false,
  flag = false,
  phone = false,
  envelopeOpen = false,
  replyAll = false,
  expanded,
  onClick,
})=>{
  const handleOnClick=(propName='')=>{
    onClick(propName)
  }

  const getDisplay=(doesItemDisplay)=>{
    if(expanded) return true
    return doesItemDisplay
  }

  const getColor=(normalColor, doesItemDisplay)=>{
    if(doesItemDisplay){return normalColor}
    return 'lightgrey'
  }

  return(
    <Styles.IconBoxes>
      &nbsp;
      <Icons.Archive display={getDisplay(archived)} color={getColor('inherit', archived)} onClick={()=>handleOnClick('archived')}/> 
      <Icons.Cash  display={getDisplay(cash)} color={getColor('green', cash)}onClick={()=>handleOnClick('billReminder')}/> 
      <Icons.Phone  display={getDisplay(phone)} color={getColor('inherit', phone)}onClick={()=>handleOnClick('followUpPhone')}/> 
      <Icons.EnvelopeOpenFill  display={getDisplay(envelopeOpen)} color={getColor('inherit', envelopeOpen)} onClick={()=>handleOnClick('followUpReadEmail')}/> 
      <Icons.ReplyAll  display={getDisplay(replyAll)} color={getColor('inherit', replyAll)}onClick={()=>handleOnClick('followUpSendEmail')}/> 
      <Icons.Exclamation  display={getDisplay(exclamation)} color={getColor('red', exclamation)}onClick={()=>handleOnClick('urgent')}/> 
      <Icons.Flag display={getDisplay(flag)} color={getColor('red', flag)} onClick={()=>handleOnClick('flag')}/>  
    </Styles.IconBoxes>
  )
}

export const _DisplayIcons=({
  archived = false,
  cash = false,
  exclamation = false,
  flag = false,
  phone = false,
  envelopeOpen = false,
  replyAll = false,
})=>{
  return(
    <Styles.IconBoxes>
      &nbsp;
      <Icons.Archive display={archived}/> 
      <Icons.Cash display={cash} color='green'/> 
      <Icons.Phone display={phone}/>
      <Icons.EnvelopeOpenFill display={envelopeOpen}/>
      <Icons.ReplyAll display={replyAll}/>
      <Icons.Exclamation display={exclamation} color='red'/>
      <Icons.Flag display={flag} color='red'/>
    </Styles.IconBoxes>
  )
}