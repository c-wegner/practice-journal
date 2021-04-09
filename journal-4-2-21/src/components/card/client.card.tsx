import React, {useState} from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client } from '../../models';

export const ClientCard =({
  client = new Client(),
  currentClient = new Client(),
  onSelectClient
})=>{
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)
  useEffect(()=>{
      switch(currentClient.id){
        case undefined:
        case '':
          setExpanded(false)
          setOpacity(1)
          break;
        default:
          if(currentClient.id === client.id){
            setExpanded(true)
            setOpacity(1)
          }else{
            setExpanded(false)
            setOpacity(.7)
          }
      }
  }, [currentClient, client])

  const handleClick=()=>{
    setExpanded(!expanded);
    onSelectClient(client)
  }
}