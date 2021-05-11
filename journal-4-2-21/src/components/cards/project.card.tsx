import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client, Project } from '../../_models';
import { Line, SizeText, Text, Title, _DisplayIcons, IconHolder, DragableCard } from './styles';
import *as Icons from '../icons/_icons.v.2'
import { CardTime } from './time.card';
import { Panel } from '../panel/panels';
import { ProjectForm } from '../../forms/project.form';
import { ClientForm } from '../../forms/client.forms';
import { TimeForm } from '../../forms/time.form';

const TaskInput = styled.input<{ borderColor: string, backgroundColor?: string }>`
  border: 1px solid;
  border-color: ${p => p.borderColor};
  display: flex;
  align-items: center;
  font-size: .9rem;
  color: ${p => p.color};
  flex-grow: 1;
  padding: 0;
  background-color: ${p => p.backgroundColor};
  
`;

const HeadHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: .8rem;
`


export const ProjectCard = ({
  project = new Project(),
  currentClient = new Client(),
  currentProject = new Project(),
  onProjectSelect,
  onDragStart = null,
  currentLane = ''
}) => {
  const [showPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)
  const [task, setTask] = useState(project.task)
  const [subTask, setSubTask]= useState(project.subTask)

  const handleKeyUp = (event, prop) => {
    if (event.keyCode === 13) {
      project.update(prop, event.target.value);
    }
  };

  useEffect(() => {

    setShowPanel('')
    setOpacity(1)

    if (currentProject.id !== '') {
      if (currentProject.id === project.id) {
        setExpanded(true)
      } else {
        setOpacity(.6)
        setExpanded(false)
      }
      return
    }

    if (currentClient.id !== '') {
      if (currentClient.id === project.clientId) {

      } else {
        setOpacity(.6)
        setExpanded(false)
      }
      return
    }
  }, [currentClient, currentProject, project])

  const handleClick = () => {
    setExpanded(!expanded)
    onProjectSelect(project)
  }

  const getBorderColor = () => {
    return 'inherit'
  }

  const getBackgroundColor = () => {
    if (project.urgent) {
      return 'rgba(212, 44, 44, 0.82)'
    }
    if (currentLane === '@Wegner Law PLLC') {
      if(project.assignedTo==='cwegner'){
        return 'inherit'
      }
    }
    if (project.checkInOn) {
      return 'rgba(38, 38, 255, 0.59)'
    } else {
      return 'inherit'
    }
  }

  const getTitleColor = () => {
    if (project.urgent) {
      return 'white'
    }
    if (project.checkInOn ) {
      if(currentLane==='Wegner Law PLLC'){
        if(project.assignedTo==='cwegner'){
          return 'inherit'
        }
        return 'white'
      }

      return 'white'
    }

    return 'inherit'
  }

  const getTaskBoxBorder = () => {
    if (expanded) {

      return 'lightgray'
    }

    return 'transparent'

  }



  return (
    <Fragment>
      <DragableCard boxShadow={expanded}
        opacity={opacity}
        onDragStart={() => onDragStart()}
        borderColor={getBorderColor()} 
        backGroundColor={getBackgroundColor()}
      >
        <Line displayWhenCollapsed expanded={expanded}>
          <Title onClick={() => handleClick()} color={getTitleColor()}>
            {SizeText(project.display, 35)}
          </Title>
          <HeadHolder>

            {project.clientShortName}

            <_DisplayIcons
              archived={!project.open}
              phone={project.followUpPhone}
              envelopeOpen={project.followUpReadEmail}
              replyAll={project.followUpSendEmail}
              exclamation={project.urgent}
              flag={project.flagged}
              cash={project.billReminder}
              color={getTitleColor()}
            />
          </HeadHolder>
        </Line>

        <Line displayWhenCollapsed expanded={expanded}>
          <Text fontSize='.9rem' color={getTitleColor()}>
            <TaskInput
              value={task}
              onChange={e => setTask(e.target.value)}
              borderColor={getTaskBoxBorder()}
              readOnly={expanded ? false : true}
              onKeyUp={e => handleKeyUp(e, "task")}
              backgroundColor={'transparent'}
              color={getTitleColor()}
            />
          </Text>
        </Line>
        <Line expanded={expanded}>
        <Text fontSize='.9rem' color={getTitleColor()}>
            <TaskInput
              value={subTask}
              onChange={e => setSubTask(e.target.value)}
              borderColor={getTaskBoxBorder()}
              readOnly={expanded ? false : true}
              onKeyUp={e => handleKeyUp(e, "subTask")}
              backgroundColor={'transparent'}
            />
          </Text>
        </Line>

        <Line expanded={expanded} justifyContent='flex-end'>
          <Text>
            Created: {project.getCreationDate()}
          </Text>
          <Text right>
            <IconHolder>
              <Icons.Pen display color='blue' size='1.2rem' onClick={() => setShowPanel('Edit project')} />
            </IconHolder>
            <IconHolder>
              <Icons.ClockDashed display color='blue' size='1.2rem' onClick={() => setShowPanel('Add time')} />
            </IconHolder>
          </Text>
        </Line>
      </DragableCard>

      <Panel id='Edit project' onExit={() => setShowPanel('')} current={showPanel}>
        <ProjectForm obj={project} />
      </Panel>

      <Panel id='Add time' onExit={() => setShowPanel('')} current={showPanel}>
        <TimeForm obj={project.createNewTimeEntry()} />
      </Panel>
    </Fragment>
  )
}

function checkIfCardHasSpecialStatus(card: Project){
  if(card.urgent){
    return true
  }

  if(card.checkInOn){
    if(card.lane!=='@Wegner Law PLLC'){
      return true
    }
  }
  return false
}