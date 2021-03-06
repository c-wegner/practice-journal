import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client, ProjectsContext } from '../../models';
import { Card, DisplayIcons, Line, Text, Title, _DisplayIcons } from './styles';
import * as Icons from '../icons'
import { Panel } from '../panels/panel';
import { ProjectForm } from '../../forms/project.forms';
import { ClientForm } from '../../forms/client.forms';
import { Dialog } from '../dialog/dialog';
import { TimeForm } from '../../forms/time.forms';
import { useContext } from 'react';

export const ClientCard = ({
  client = new Client(),
  currentClient = new Client(),
  onSelectClient
}) => {
  const [showPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)

  const list = useContext(ProjectsContext)

  const temp = list.prepareClient(client.id)
  client._projects.open = temp.open;
  client._projects.closed = temp.closed

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
          <_DisplayIcons
            archived={client.archived}
            envelopeOpen= {client.followUpReadEmail}
            replyAll ={client.followUpSendEmail}
            flag = {client.flagged}
            cash = {client.billReminder}
          />
        </Line>
        <Line
        displayWhenCollapsed
          expanded={expanded}>
          <Text >
            {client.contact}
          </Text>&nbsp;
          <Text right>
            {client.contactTitle}
          </Text>
        </Line>
        <Line expanded={expanded}>
          <Text>
            <Icons.Phone color='blue' display size='.8rem' margin='0 4px 0 0' />
            {client.phone}
          </Text>
          <Text right>
            <Icons.Envelope color='blue' display size='.8rem' margin='0 4px 0 0' />
            <a href={'mailTo:' + client.email}>
              {client.email}
            </a>
          </Text>
        </Line>


        <Line expanded={expanded} justifyContent='flex-end'>
          <Text>
            <Icons.Pen display size='1.2rem' onClick={() => setShowPanel('Edit client')} />
            <Icons.FolderPlus display size='1.2rem' onClick={() => setShowPanel('Add project')} />
            <Icons.ClockDashed display size='1.2rem' onClick={()=>setShowPanel('New time entry')} />
          </Text>
        </Line>
      </Card>
      <Panel id='Edit client' current={showPanel} onExit={() => setShowPanel('')}>
        <ClientForm obj={client} />
      </Panel>
      <Panel id='Add project' current={showPanel} onExit={() => setShowPanel('')}>
        <ProjectForm obj={client.createProject()} />
      </Panel>

      <Dialog id='New time entry' onExit={()=>setShowPanel('')} current={showPanel}>
        <TimeForm obj={client.createTimeEntry()}/>
      </Dialog>
    </Fragment>
  )
}