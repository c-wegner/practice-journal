import React, { useState, useContext, Fragment } from 'react';
import styled from 'styled-components'
import { ClientCard } from '../../components/cards/client.card';
import { ProjectCard } from '../../components/cards/project.card';
import { Client, ClientsContext, Project, ProjectsContext } from '../../_models';
import { Header, Heading, LaneStyle } from './dashboard';
import * as Icons from '../../components/icons/_icons.v.2'
import { Panel } from '../../components/panel/panels';
import { ClientForm } from '../../forms/client.forms';

export const ClientLane = ({
  currentClient,
  handleSelectClient
}) => {
  const book = useContext(ClientsContext)
  const [viewClientType, setViewClientType] = useState('Active clients')
  const [showPanel, setShowPanel] = useState('')

  const handleChangeFilter = () => {
    switch (viewClientType) {
      case 'Active clients':
        setViewClientType('Current clients')
        break
      case 'Current clients': setViewClientType('Clients with billables')
        break
      case 'Clients with billables': setViewClientType( 'All clients')
      break
      case 'All clients': setViewClientType( 'Active clients')
      break
    }
  }

  return (
    <Fragment>
      <LaneStyle>
        <Header>
          <Heading onClick={() => handleChangeFilter()}>
            {viewClientType}
          </Heading>
          <Icons.PersonPlus size='1.2rem' onClick={() => setShowPanel('Add client')} />
        </Header>
        {
          book.getFilteredCards(viewClientType).map((x) => (
            <ClientCard client={x} currentClient={currentClient} onClientSelect={handleSelectClient} key={x.id} />

          ))
        }
      </LaneStyle>
      <Panel id='Add client' current={showPanel} onExit={() => setShowPanel('')}>
        <ClientForm obj={new Client()} />
      </Panel>
    </Fragment>
  )
}
