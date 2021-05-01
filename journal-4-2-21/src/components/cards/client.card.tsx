import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client } from '../../_models';
import { Card, Line, Text, Title, _DisplayIcons, IconHolder } from './styles';
import *as Icons from '../icons/_icons.v.2'
import { CardTime } from './time.card';
import { Panel } from '../panel/panels';
import { ProjectForm } from '../../forms/project.form';
import { ClientForm } from '../../forms/client.forms';
import { TimeForm } from '../../forms/time.form';





export const ClientCard = ({
  client = new Client(),
  currentClient = new Client(),
  onClientSelect,
}) => {
  const [showPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
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

  const handleClick = () => {
    setExpanded(!expanded)
    onClientSelect(client)
  }

  return (
    <Fragment>
      <Card boxShadow={expanded} opacity={opacity}>
        <Line displayWhenCollapsed expanded={expanded}>
          <Title onClick={() => handleClick()}>
            {client.display}
          </Title>
          <_DisplayIcons
            archived={client.archived}
            phone={client.followUpPhone}
            envelopeOpen={client.followUpReadEmail}
            replyAll={client.followUpSendEmail}
            flag={client.flagged}
            cash={client.billReminder}
          />
        </Line>

        <Line displayWhenCollapsed expanded={expanded}>
          <Text fontSize='.9rem'>
            {client.contact} &nbsp;
          </Text>
          <CardTime obj={client} />
        </Line>
        <Line expanded={expanded}>
          <ContactItem itemType='phone' content={client.phone} />
          <ContactItem itemType='email' content={client.email} />
        </Line>
        <Line expanded={expanded}>
          <Text>
          Projects
          </Text>
          <Text right>
         Time
          </Text>
        </Line>
        <Line expanded={expanded}>
          <Text>
          Open: {client.currentProjects} Total: {client.currentProjects}
          </Text>

          <Text right>
          Current: {roundNumbers(client.currentTime)} Total: {roundNumbers(client.totalTime)}
          </Text>
        </Line>
        <Line expanded={expanded} justifyContent='flex-end'>
          <Text>

          </Text>
          <Text right>
            <IconHolder>
            <Icons.Pen display color='blue' size='1.2rem' onClick={()=>setShowPanel('Edit client')} />
            </IconHolder>
            <IconHolder>
            <Icons.ClockDashed display color='blue' size='1.2rem' onClick={()=>setShowPanel('Add time')}/>
            </IconHolder>
            <IconHolder>
            <Icons.FolderPlus display color='blue' size='1.2rem' onClick={()=>setShowPanel('Add project')}/>
            </IconHolder>
          </Text>
        </Line>
      </Card>
      <Panel id='Add project' onExit={()=>setShowPanel('')} current={showPanel}>
        <ProjectForm obj={client.createNewProject()}/>
      </Panel>

      <Panel id='Edit client' onExit={()=>setShowPanel('')} current={showPanel}>
        <ClientForm obj={client}/>
      </Panel>

      <Panel id='Add time' onExit={()=>setShowPanel('')} current={showPanel}>
        <TimeForm obj={client.createNewTimeEntry()}/>
      </Panel>
    </Fragment>
  )
}

export const ContactItem = ({ itemType = 'phone', content = '' }) => {

  const getIconType = () => {
    if (itemType === 'phone') {
      return <Icons.Phone display color='blue' />
    } else {
      return <Icons.Envelope display color='blue' />
    }
  }
  return (
    <Text>
      <Icons.IconBoxStyle display='flex' color='blue'>
        {getIconType()} 
      </Icons.IconBoxStyle>&nbsp; {content}
    </Text>
  )
}

function roundNumbers(num: number){
  let temp = Math.round(num * 10)
  temp = temp/10
  return temp
}