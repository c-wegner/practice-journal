import React, { useState, createContext, useEffect } from 'react';
import firebase, { app } from "../globals/firebase";

export class IFormContext {
  objectState: object;
  update: any;
  submit: any;
  edit: any;
}

export const FormContext = createContext(new IFormContext())

export const FormProvider = ({ obj = new Object(), path = '', children, nextObject = null, req = [], editable = true }) => {
  const [state, setState] = useState(cloneObject(obj))

  useEffect(() => {
    setState(cloneObject(obj))
  }, [obj])

  const context: IFormContext = {
    objectState: state,
    update: (val, prop, radioValue = '') => {
      if (radioValue === '') {
        setState(updateObject(val, prop, state))
      } else {
        setState(updateObject(radioValue, prop, state))
      }
    },
    submit: (modifiedState = null) => {
      const hasOtherState = modifiedState !==null
      let submitState = hasOtherState? modifiedState : state

      if (validateObject(submitState, req)) {
        submitObject(submitState, path)
        if (nextObject !== null) {
          setState(nextObject)
        } else {
          setState({ id: new Date().getTime().toString() })
        }
      }
    },
    edit: (val, prop) => {
      editObject(state, path, val, prop)
    }
  }

  return (
    <FormContext.Provider value={context}>
      {children}
    </FormContext.Provider>
  )
}

function updateObject(val, prop, obj) {
  let temp = cloneObject(obj);
  temp[prop] = val
  return temp
}

function cloneObject(obj: object): object {
  let temp = new Object();
  for (let p in obj) {
    temp[p] = obj[p]
  }
  return temp
}

export function submitObject(obj, path) {
  obj.id = obj.id.toString()
  const db = firebase.firestore(app);
  db.collection(path)
    .doc(obj.id)
    .set(obj);
}

function validateObject(obj: any, required: string[]) {
  for (let s of required) {
    if (obj[s] === undefined || obj[s] === '') {
      alert('You must provide ' + s);
      return false;
    }
  }
  return true
}

export function editObject(obj, path, val, prop) {
  obj.id = obj.id.toString()
  const updatedPropVal = {
    [prop]: val
  }

  const db = firebase.firestore(app);
  db.collection(path).doc(obj.id).update(updatedPropVal)
}