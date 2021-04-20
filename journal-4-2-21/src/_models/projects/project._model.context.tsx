import React, { createContext, Fragment, useEffect, useState } from "react";

import firebase, { app } from "../firebase";
import { Projects, projectPath, Project } from "./projects._model";

export const ProjectsContext = createContext(new Projects())

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const list = new Projects()

  let wegnerTimerData = null;

  if (localStorage.getItem('wegnerTimerData')) {
    wegnerTimerData = JSON.parse(localStorage.getItem('wegnerTimerData'))
  }

  const loadProjects = () => {
    const db = firebase.firestore(app);

    db.collection(projectPath).onSnapshot(function (querySnapshot) {
      list.projects = []
      querySnapshot.forEach(function (doc) {
        const p = cloneProject(doc.data());
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