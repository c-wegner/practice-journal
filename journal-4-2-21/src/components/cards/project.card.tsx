import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client, Project } from '../../_models';
import { Card, Line, SizeText, Text, Title, _DisplayIcons, IconHolder } from './styles';
import *as Icons from '../icons/_icons.v.2'
import { CardTime } from './time.card';
import { Panel } from '../panel/panels';
import { ProjectForm } from '../../forms/project.form';
import { ClientForm } from '../../forms/client.forms';
import { TimeForm } from '../../forms/time.form';

const TaskInput = styled.input<{borderColor: string}>`
  border: 1px solid;
  border-color: ${p => p.borderColor};
  display: flex;
  align-items: center;

  color: ${p => p.color};
  flex-grow: 1;
  padding: 0;
  
`;

const HeadHolder= styled.div `
  display: flex;
  justify-content: flex-end;
  font-size: .8rem;
`


export const ProjectCard = ({
  project = new Project(),
  currentClient = new Client(),
  currentProject = new Project(),
  onProjectSelect,
}) => {
  const [showPanel, setShowPanel] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1)
  const [task, setTask] = useState(project.task)

  const handleKeyUp = (event, prop) => {
    if (event.keyCode === 13) {
      project.update(prop, event.target.value);
    }
  };

  useEffect(() => {

    setShowPanel('')
    setOpacity(1)

    if(currentProject.id!==''){
      if(currentProject.id=== project.id){
        setExpanded(true)
      }else{
        setOpacity(.6)
        setExpanded(false)
      }
      return
    }

    if(currentClient.id!==''){
      if(currentClient.id===project.clientId){

      }else{
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

  return (
    <Fragment>
      <Card boxShadow={expanded} opacity={opacity}>
        <Line displayWhenCollapsed expanded={expanded}>
          <Title onClick={() => handleClick()}>
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
          />
</HeadHolder>
        </Line>

        <Line displayWhenCollapsed expanded={expanded}>
          <Text fontSize='.9rem'>
          <TaskInput
            value={task}
            onChange={e => setTask(e.target.value)}
            borderColor={expanded ? "lightgrey" : "white"}
            readOnly={expanded ? false : true}
            onKeyUp={e => handleKeyUp(e, "task")}
          />
          </Text>
          <CardTime obj={project} />
        </Line>

        <Line expanded={expanded} justifyContent='flex-end'>
          <Text>

          </Text>
          <Text right>
            <IconHolder>
            <Icons.Pen display color='blue' size='1.2rem' onClick={()=>setShowPanel('Edit project')} />
            </IconHolder>
            <IconHolder>
            <Icons.ClockDashed display color='blue' size='1.2rem' onClick={()=>setShowPanel('Add time')}/>
            </IconHolder>
          </Text>
        </Line>
      </Card>

      <Panel id='Edit project' onExit={()=>setShowPanel('')} current={showPanel}>
        <ProjectForm obj={project}/>
      </Panel>

      <Panel id='Add time' onExit={()=>setShowPanel('')} current={showPanel}>
        <TimeForm obj={project.createNewTimeEntry()}/>
      </Panel>
    </Fragment>
  )
}

export const ContactItem = ({ itemType = 'Phone', content = '' }) => {
  if (content === '') {
    return <Fragment>&nbsp;</Fragment>
  }

  const getIconType = () => {
    if (itemType === 'Phone') {
      return <Icons.Phone display margin='0 5px 0 0' color='blue' />
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