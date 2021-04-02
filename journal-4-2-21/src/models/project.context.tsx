import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClientsContext} from './client.context';
import {Project, Projects, projectPath } from './projects';
export {Project}
import firebase, { app } from '../globals/firebase';

export const ProjectContext = createContext(new Projects())

const modelProject = new Project()

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({})
  const book = useContext(ClientsContext)
  const list = new Projects()
  

  const loadProjects = () => {
    const db = firebase.firestore(app);

    db.collection(projectPath).onSnapshot(function (querySnapshot) {
      list.projects = {};
      querySnapshot.forEach(function (doc) {
        const p = cloneProject(doc.data())
        if (p.lastSave === undefined || p.lastSave === 0) {
          p.lastSave = new Date().getTime()
        }
    
        list.projects[p.id] = p

      })
      setProjects(list.projects)
    })

  }
  useEffect(() => {
    loadProjects()
  }, [])


  return (
    <ProjectContext.Provider value={list.update(projects, book)}>
      {children}
    </ProjectContext.Provider>

  )
}

function cloneProject(obj: any): Project {
    const temp = new Project();
    for (let p in obj) {
      temp[p] = obj[p];
    }
    return temp;
  }