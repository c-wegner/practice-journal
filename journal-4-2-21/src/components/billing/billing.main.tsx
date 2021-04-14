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

const HeaderStyle = styled.div`
display: flex;
flex-direction: row;
width: 100%;
flex-grow: 1;
background-color: white;
padding: 7px;

font-weight: 500;

border-bottom: 1px solid;
padding: 0 0 3px 0;
margin-bottom: 5px;
`

export const BillingSheet = ({})=>{
  const timeSheet = useContext(TimeContext)
  return(
    <BillPageStyle>
      <Headers/>
  
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
      <BillItemStyle width='10%' justifyContent='flex-end'>
        {time.rate}
      </BillItemStyle>
      <BillItemStyle width='10%' justifyContent='flex-end'>
        {time.rate * time.time}
      </BillItemStyle>
    </BillLineStyle>
  )
}

const Headers=()=>(
  <HeaderStyle>
      
  <BillItemStyle width='10%'>
    Date
  </BillItemStyle>
  <BillItemStyle width='15%'>
    Client
  </BillItemStyle>
  <BillItemStyle width='30%^' flexGrow='1'>
    Description
  </BillItemStyle>
  <BillItemStyle width='5%' justifyContent='flex-end'>
    Time
  </BillItemStyle>
  <BillItemStyle width='10%'  justifyContent='flex-end'>
    Rate
  </BillItemStyle>
  <BillItemStyle width='10%'  justifyContent='flex-end'>
    Total
  </BillItemStyle>
</HeaderStyle>
)