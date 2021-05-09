import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ProjectCard } from '../../components/cards/project.card';
import { ProjectForm } from '../../forms/project.form';
import { Client, Project, Projects, ProjectsContext } from '../../_models';

const Stage = styled.div `
  display: flex;
`;  

const ListColumn = styled.div `
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export const ProjectsView = ()=>{
  const [currentProject, setCurrentProject] = useState(new Project())
  const list = useContext(ProjectsContext)

  const handleProjectSelect=(p:Project)=>{
    if(p.id===currentProject.id){
      setCurrentProject(new Project())
    }else{
      setCurrentProject(p)
    }
  }

  return(
    <Stage>
      <ListColumn>
        {
         arrangeProjectsForList (list).map(x=>(
              <ProjectCard
                key={x.id}
                project={x}
                onProjectSelect={()=>handleProjectSelect(x)}
                onDragStart={()=>{}}
                />
          ))
        }
      </ListColumn>
      <ProjectForm obj={currentProject}/>
    </Stage>
  )
}

function arrangeProjectsForList(list: Projects){
  let temp = list.projects
  temp.sort((x,y)=>compareProjects(x,y))
  return temp
}

function compareProjects(x:Project, y:Project){
  return x.projectId.localeCompare(y.projectId)
}