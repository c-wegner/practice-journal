import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client } from '../../models';
import { Card, DisplayIcons, Line, Text, Title } from './styles';
import * as Icons from '../icons'

export const ClientCard = ({
  client = new Client(),
  currentClient = new Client(),
  onSelectClient
}) => {
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    switch (currentClient.id) {
      case undefined:
      case '':
        setExpanded(false)
        setOpacity(1)
        break;
      default:
        if (currentClient.id === client.id) {
          setExpanded(true)
          setOpacity(1)
        } else {
          setExpanded(false)
          setOpacity(.7)
        }
    }
  }, [currentClient, client])

  const handleClick = () => {
    setExpanded(!expanded);
    onSelectClient(client)
  }

  return (
    <Fragment>
      <Card boxShadow={expanded} opacity={opacity}>
        <Line displayWhenCollapsed expanded={expanded}>
          <Title onClick={() => handleClick()}>
            {client.display}
          </Title>
 
        </Line>
        <Line
          expanded={expanded}>
            <Text>
              {client.contact}
            </Text>
            <Text>
              {client.contactTitle}
            </Text>
          </Line>
          <Line expanded={expanded}>
            <Text>
              <Icons.Phone color='blue' display size='.8rem' margin='0 4px 0 0'/>
              {client.phone}
            </Text>
            <Text>
              <Icons.Envelope color='blue' display size='.8rem' margin='0 4px 0 0'/>
              <a href={'mailTo:' + client.email}>
                {client.email}
              </a>
            </Text>
          </Line>
      </Card>
    </Fragment>
  )
}