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

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
`;


const Stage = styled.div`
    display: flex;
    flex-direction: column;
`;


export const Main = ({ }) => {
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
            </Router>
        </Wrapper>
    )
}