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

  useEffect(){


  }

  const handleClick=()=>{
    setExpanded(!expanded);
    onSelectClient(client)
  }
}