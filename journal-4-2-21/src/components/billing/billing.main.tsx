import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components'
import { Time, TimeContext } from '../../models';

const BillPageStyle = styled.div `
  display: flex;
  flex-direction: column;
  padding: 5%;
`;

const BillLineStyle = styled.div <{background?: string, color?: string}> `
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
  background-color: ${p=>p.background};
  padding: 7px;
`

const BillItemStyle = styled.div<{width: string, justifyContent?:string, flexGrow?: string}> `
  width: ${p=>p.width};

  display: flex;
  justify-content: ${p=>p.justifyContent};
  flex-grow: ${p=>p.flexGrow};
  background-color: inherit;
`

export const BillingSheet = ({})=>{
  const timeSheet = useContext(TimeContext)
  return(
    <BillPageStyle>

  
      {
        timeSheet._times.map((x,i)=>{
          return(
            <BillingLine time={x} currentLine={i}/>
          )
        })
      }
    </BillPageStyle>
  )
}

const BillingLine = ({time = new Time(), currentLine = 0})=>{
  const getBackground=()=>{
    const cur = currentLine%2
    if(cur===1){
      return 'lightblue'
    }else{
      return 'inherit'
    }
  }
  return(
    <BillLineStyle background={getBackground()} color='black'>
      
      <BillItemStyle width='10%'>
        {time.billTo}
      </BillItemStyle>
      <BillItemStyle width='15%'>
        {time.clientName}
      </BillItemStyle>
      <BillItemStyle width='30%^' flexGrow='1'>
        {time.description}
      </BillItemStyle>
      <BillItemStyle width='5%' justifyContent='flex-end'>
        {time.time}
      </BillItemStyle>
    </BillLineStyle>
  )
}