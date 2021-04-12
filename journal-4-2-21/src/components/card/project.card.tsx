import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client, Project } from '../../models';
import { Card, DisplayIcons, Line, Text, Title } from './styles';
import * as Icons from '../icons'
import { Panel } from '../panels/panel';
import { ProjectForm } from '../../forms/project.forms';
import { ClientForm } from '../../forms/client.forms';
import { TimeForm } from '../../forms/time.forms';

export const ProjectCard = ({
  project = new Project(),
  currentClient = new Client(),
  currentProject = new Project(),
  onSelectProject
}) => {
  const [showPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {

    
    switch (currentProject.id) {
      case undefined:
      case '':
        setExpanded(false)
        setShowPanel('')
        setOpacity(1)
        break;
 
    }

    switch (currentClient.id) {
      case undefined:
      case '':
        setExpanded(false)
        setShowPanel('')
        setOpacity(1)
        break;

      default:
        if (currentClient.id === project.clientId) {
          setOpacity(1)
        } else {

          setExpanded(false)
          setShowPanel('')
          setOpacity(.6)
        }
    }

  }, [currentClient, currentProject])

  const handleClick = () => {
    setExpanded(!expanded);
    onSelectProject(project)
  }

  return (
    <Fragment>
      <Card boxShadow={expanded} opacity={opacity}>
        <Line displayWhenCollapsed expanded={expanded}>
          <Title onClick={() => handleClick()}>
            {project.display}
          </Title>
          <Text>
          </Text>
        </Line>
        <Line
          expanded={expanded}
          displayWhenCollapsed
          >
          <Text>
            {project.task}
          </Text>&nbsp;
          <Text>
            {project.clientShortName}
          </Text>
        </Line>
        <Line expanded={expanded} justifyContent='flex-end'>
          <Text>
          <Icons.Pen display color='blue' size='1.2rem' onClick={()=>setShowPanel('Edit project')}/>
          <Icons.ClockDashed display size='1.2rem' onClick={()=>setShowPanel('New time entry')} />
          </Text>
        </Line>
      </Card>
      <Panel id='Edit project' current={showPanel} onExit={() => setShowPanel('')}>
        <ProjectForm obj={project} />
      </Panel>
      <Panel id='New time entry' current = {showPanel} onExit={()=>setShowPanel('')}>
        <TimeForm obj={project.createTimeEntry()}/>
      </Panel>
    </Fragment>
  )
}