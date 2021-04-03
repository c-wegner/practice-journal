import styled, { createGlobalStyle } from 'styled-components';

export const values = {
  color: "#222",
  backgroundColor: "#FFF",
  secondaryColor: "grey",
  secondaryBackgroundColor: "grey",
  border: "1px solid #222",
  borderRadius: "3px",
  padding: "7px",
  margin: "7px",
  inputHeight: "2.2rem",

  shadow: {
    standard: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    hover: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  },

  screen: {
    sm: "555px",
    md: "825px",
    lg: "1000px"
  }
}

export const GlobalStyle = createGlobalStyle`
    :root{
        font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;  
        color: #222;
        font-size: 14px;
    }


    *{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      line-height: 1.3rem;
      font-weight:500;
    }
    html, body{
      min-height: 100vh;
      overflow-x: hidden;
    }
    textarea{
      resize: none;
    }
    input, textarea{
      font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;  
      font-size: 1rem;
      color:#222;
    }
    a{
      color: blue;
      text-decoration: none;
      &:hover{
        color: red;
      }
    }
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey; 
      border-radius: 0;
    }
      
    ::-webkit-scrollbar-thumb {
      background: lightgrey; 
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: crimson; 
    }
  `;
