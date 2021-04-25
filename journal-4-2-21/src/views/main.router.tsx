import React, { Fragment, useContext } from "react";
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useParams
} from "react-router-dom";
import { useState } from "react";
import { Dialog } from "../components/dialog/dialog";
import { OptionStyle, Menu } from "../components/menu/menu.navigation";
import { Client, ClientsContext } from "../_models";
import { Dashboard } from "./dashboard/dashboard";
import { TimeSheet } from "../components/timesheet/timesheet.styles";
import { AuthContext, LogIn } from "../_models/auth/auth.model.view.context";

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
`;
/////////////////////////////////////////////////////////////////////

const Stage = styled.div`
    display: flex;
    flex-direction: column;
`;

const FakeLane = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`


export const Main = ({ }) => {
  const authContext = useContext(AuthContext);

  const [dialog, setDialog] = useState('')


  const book = useContext(ClientsContext)
  return (
    <Wrapper>
      <Router>
        <Stage>
          <Menu>
            <OptionStyle>
              <Link to='/clients'>
                Clients
              </Link>
            </OptionStyle>
            <OptionStyle>
              <Link to='/projects'>
                Projects
              </Link>
            </OptionStyle>
            <OptionStyle>
              <Link to='/billing'>
                Billing
              </Link>
            </OptionStyle>
            <OptionStyle>
              <Link to='options'>
                Options
                </Link>
            </OptionStyle>
          </Menu>


        </Stage>
        <Switch>
          <Route exact path='/'>
            <SiteHider userState={authContext.user} logInScreen={true}>
              <LogIn />
            </SiteHider>
            <SiteHider userState={authContext.user} logInScreen={false}>
              <Dashboard />
            </SiteHider>
          </Route>

          <Route path='/billing'>
            <TimeSheet />
          </Route>
        </Switch>
      </Router>
      <Dialog id='Testing' current={dialog} onExit={() => setDialog('')}>
        Hello
            </Dialog>
    </Wrapper>
  )
}

const SiteHiderStyle = styled.div<{ display: string }>`
  display: ${p => p.display};
  min-height: 100vh;
`;

const getDisplay = (user, login) => {
  if (user && !login) return "block";
  if (!user && login) return "block";
  return "none";
};

const SiteHider = ({ userState, logInScreen, children }) => (
  <SiteHiderStyle display={getDisplay(userState !== null, logInScreen)}>
    {children}
  </SiteHiderStyle>
);