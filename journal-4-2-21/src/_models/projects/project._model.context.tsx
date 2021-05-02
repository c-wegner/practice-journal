import React, { createContext, Fragment, useEffect, useState } from "react";

import firebase, { app } from "../firebase";
import { Projects, projectPath, Project } from "./projects._model";
export {Projects, Project, projectPath}

export const ProjectsContext = createContext(new Projects())

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const list = new Projects()

  let wegnerStoredTimerData = null;

  const loadProjects = () => {
    const db = firebase.firestore(app);
    if (localStorage.getItem('wegnerStoredTimerData')) {
      wegnerStoredTimerData = JSON.parse(localStorage.getItem('wegnerStoredTimerData'))
    }
    db.collection(projectPath).onSnapshot(function (querySnapshot) {
      list.projects = []
      querySnapshot.forEach(function (doc) {
        const p = cloneProject(doc.data());
        p.hasOpenTime = false;
        p.timerIsRunning = true;
        if (localStorage.getItem('wegnerStoredTimerData')) {
          if(wegnerStoredTimerData.objId===p.id && wegnerStoredTimerData.objType==='project'){
            p.hasOpenTime = true
           p.timerIsRunning = wegnerStoredTimerData.timerRunning
          }
        }
        list.addProject(p)
      });
      setProjects(list.projects);

    });
  };
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={list.update(projects)}>
      {children}
    </ProjectsContext.Provider>
  );
};

function cloneProject(obj: any): Project {
  const temp = new Project();
  for (let p in obj) {
    temp[p] = obj[p];
  }
  return temp;
}