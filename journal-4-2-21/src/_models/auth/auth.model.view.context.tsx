import React, {createContext, useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {LegacyTextBox, Button, } from '../../controls';
import { values, Row } from "../../globals/styles";
import { auth } from "../../models/firebase";

const Styles={
  Stage: styled.div `
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Form: styled.div `
    border-radius: ${values.borderRadius};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin: 7px;
    padding: 0 7px;
    padding: 15px;
    width: 350px;
`,
}

export const LogIn=({})=>{
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const userContext=useContext(AuthContext)

  const handleSubmit=()=>{
    userContext.logIn(userName, password)
  }

  return(
    <Styles.Stage>
      <Styles.Form>
        <Row>
        <LegacyTextBox
          label='Username'
          value={userName}
          onChange={val=>setUserName(val)}
        />
        </Row>
        <Row>
        <LegacyTextBox
          label='Password'
          value={password}
          onChange={val=>setPassword(val)}
          inputType='password'
        />
        </Row>
        <Row>
          <Button
            label='Submit'
            onClick={()=>handleSubmit()}
          />
        </Row>

      </Styles.Form>
    </Styles.Stage>
  )
}

class IUser{
  logIn: any;
  logOut: any;
  user: any;
}

export const AuthContext = createContext(new IUser());

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const context: IUser = {
    logIn: (x, y) => signInWithEmailAndPassword(x, y, setUser),
    logOut: () => {},
    user: user
  };

  return (
    <AuthContext.Provider value={context}>
  {children}
    </AuthContext.Provider>
  );
};

function signInWithEmailAndPassword(email, password, setter) {
  auth.signInWithEmailAndPassword(email, password).then(result => {
    const newUser = result.user;
    setter(newUser);
  });
}