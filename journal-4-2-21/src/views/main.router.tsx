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
import { ClientForm } from "../forms/client.forms";
import { ClientsContext } from "../_models";
import { ProjectForm } from "../forms/project.form";
import { TimeForm } from "../forms/time.form";

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
`;


const Stage = styled.div`
    display: flex;
    flex-direction: column;
`;


export const Main = ({ }) => {


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
          {
            book.clients.map(x=>(
              <Fragment>
          {x.display}
              </Fragment>
            ))
          }
          <ClientForm />

          <br />

          <ProjectForm />

          <TimeForm/>

        </Stage>
        <Switch>
          <Route exact path='/'>

          </Route>

          <Route path='/billing'>

          </Route>
        </Switch>
      </Router>
      <Dialog id='Testing' current={dialog} onExit={() => setDialog('')}>
        Hello
            </Dialog>
    </Wrapper>
  )
}
