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
import { Menu, OptionStyle } from "../components";
import { useState } from "react";
import { Dialog } from "../components/dialog/dialog";
import { Practice } from "./view.proto";

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
  const [dialog, setDialog]= useState('')
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

                    <Practice />
                </Stage>
            </Router>
            <Dialog id='Testing' current={dialog} onExit={()=>setDialog('')}>
              Hello
            </Dialog>
        </Wrapper>
    )
}