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

const TaskInput = styled.input<{borderColor: string, fontSize: string, fontWeight: string, color: string, onKeyUp: any, value: any, readOnly: any, onChange: any}>`
  border: 1px solid;
  border-color: ${p => p.borderColor};
  display: flex;
  align-items: center;
  font-size: ${p => p.fontSize};
  font-weight: ${p => p.fontWeight};
  color: ${p => p.color};
  flex-grow: 1;
  padding: 0;

  width: 100%;
  flex-grow: 1;
  
  min-height: initial;

`;

export const ProjectCard = ({
  project = new Project(),
  currentClient = new Client(),
  currentProject = new Project(),
  onSelectProject
}) => {
  const [showPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)

  const [task, setTask] = useState(project.task);

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

  const handleKeyUp=(event, prop)=>{
    if (event.keyCode === 13) {
      project.update(prop, event.target.value);
      alert('Task updated')
    }
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
    
            <TaskInput
            value={task}
            onChange={e => setTask(e.target.value)}
            borderColor={expanded ? "lightgrey" : "white"}
            readOnly={expanded ? false : true}
            onKeyUp={e => handleKeyUp(e, "task")}
            color='inherit'
            fontSize='inherit'
            fontWeight='inherit'
            />
          </Text>
          
          
          &nbsp;
          <Text right>
            {project.clientShortName}
          </Text>
        </Line>
        <Line expanded={expanded} justifyContent='flex-end'>
          <Text right>
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