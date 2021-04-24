import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Logo from './logo.menu.png';

const MenuBarStyle = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
`;

const LogoStyle = styled.img`
    height: 45px;
    cursor: pointer;
`

export const Menu = ({ children }) => {
  const history = useHistory()
  const handleLogoClick=()=>{

    history.push('/')
  }
  return (
    <MenuBarStyle>
      <LogoStyle src={Logo} onClick={()=>handleLogoClick()}/>
      <MenuOptionsStyle>
        {children}
      </MenuOptionsStyle>
    </MenuBarStyle>
  )
}

const MenuOptionsStyle = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const OptionStyle = styled.div`
    margin-left: 10px;
`