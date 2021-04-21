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
import { Client, ClientsContext } from "../_models";
import { ProjectForm } from "../forms/project.form";
import { TimeForm } from "../forms/time.form";
import { ClientCard } from "../components/cards/client.card";

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
  const [currentClient, setCurrentClient] = useState(new Client())

  const [dialog, setDialog] = useState('')

  const handleSelectClient=(client: Client)=>{
    if(client.id===currentClient.id){
      setCurrentClient(new Client())
    }else{
      setCurrentClient(client)
    }
  }

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
          <ClientForm obj={currentClient}/>

          <br />

          {
            book.clients.map((x,i)=>(
              <ClientCard client={x} currentClient={currentClient} onClientSelect={()=>handleSelectClient(x)} />
            ))
          }

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
