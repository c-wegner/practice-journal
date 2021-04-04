import React from 'react';
import styled from 'styled-components';
import Logo from './logo.menu.png';

const MenuBarStyle = styled.div `
    display: flex;
    padding: 5px;
    justify-content: space-between;
`;

const LogoStyle = styled.img `
    height: 45px;
`

export const Menu= ({children})=>{
    return(
        <MenuBarStyle>
            <LogoStyle src={Logo}/>
            <MenuOptionsStyle>
                {children}
            </MenuOptionsStyle>
        </MenuBarStyle>
    )
}

const MenuOptionsStyle = styled.div `
    display: flex;
    justify-content: flex-end;
`;

export const OptionStyle = styled.div `
    margin-left: 10px;
`