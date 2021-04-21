import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client } from '../../_models';
import { Card, Line, Text, Title, _DisplayIcons } from './styles';

export const ClientCard=({
  client = new Client(),
  currentClient = new Client(),
  onClientSelect,
})=>{
  const [currentPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)

  useEffect(()=>{
    switch (currentClient.id) {
      case undefined:
      case '':
        setExpanded(false)
        setShowPanel('')
        setOpacity(1)
        break;
      default:
        if (currentClient.id === client.id) {
          setExpanded(true)
          setOpacity(1)
        } else {
          setExpanded(false)
          setShowPanel('')
          setOpacity(.7)
        }
    }
  }, [currentClient, client])

  const handleClick=()=>{
    setExpanded(!expanded)
    onClientSelect(client)
  }

  return(
    <Fragment>
      <Card boxShadow={expanded} opacity={opacity}>
      <Line displayWhenCollapsed expanded={expanded}>
          <Title onClick={() => handleClick()}>
            {client.display}
          </Title>
          <_DisplayIcons
            archived={client.archived}
            envelopeOpen= {client.followUpReadEmail}
            replyAll ={client.followUpSendEmail}
            flag = {client.flagged}
            cash = {client.billReminder}
          />
        </Line>

        <Line displayWhenCollapsed expanded={expanded}>
          <Text fontSize='.9rem'>
            {client.contact} &nbsp;
          </Text>
        </Line>
      </Card>
    </Fragment>
  )
}