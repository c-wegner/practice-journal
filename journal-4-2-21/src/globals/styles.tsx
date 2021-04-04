import styled, { createGlobalStyle } from 'styled-components';

<<<<<<< HEAD
export const styleVariables = {
    color: '#222',
    backgroundColor: '#FFF',
    secondaryColor: 'grey',
    secondaryBackgroundColor: 'grey',
    border: '1px solid #222',
    borderRadius: '3px',
    padding: '7px',
    margin: '7px',
    inputHeight: '2.2rem',
    
    fontWeight: '500',
    fontSize: '14px',

    shadow: {
        standard: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        hover: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
      },

    screen: {
        sm: '555px',
        md: '825px',
        lg: '1000px'
    }
=======
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
>>>>>>> 3e00e064304a93e4b7f4a7273f9d446e29f788a1
}

export const GlobalStyle = createGlobalStyle`
    :root{
<<<<<<< HEAD
        font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif; 
        font-size: ${styleVariables.fontSize};
        background-color: ${styleVariables.backgroundColor};
        color: ${styleVariables.color}; 
        font-weight: ${styleVariables.fontWeight};
    }

    body, html {
        overflow-x: hidden;
        min-height: 100vh;
      }
    
      *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      a{
        text-decoration: none;
      }
    
      input, textarea{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: ${styleVariables.fontSize}
        min-height: ${styleVariables.inputHeight};
        padding: ${styleVariables.padding};
        background-color: ${styleVariables.backgroundColor};
        border-radius: ${styleVariables.borderRadius};
      }
`;

export const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const RowStyle = styled.div<{justifyContent: string, alignItems: string}> `
      display: flex;
      flex-direction: column;

      @media(min-width: ${styleVariables.screen.md}){
          flex-direction: row;
          justify-content: ${p=>p.justifyContent};
          align-items: ${p=>p.alignItems};

          border: 1px solid;
      }
`

export const Row=({children, justifyContent ='justify-start', alignItems ='flex-start'})=>(
    <RowStyle alignItems={alignItems} justifyContent={justifyContent}>
        {children}
    </RowStyle>
)

const ColStyle = styled.div<{justifyContent: string, alignItems: string, width: string, flexGrow: string}> `
    display: flex;
    flex-direction: column;
    width: 100%;

    @media(min-width: ${styleVariables.screen.md}){
        width: ${p=>p.width};
        flex-grow: ${p=>p.flexGrow};
        justify-content: ${p=>p.justifyContent};
        align-items: ${p=>p.alignItems};

        border: 1px solid;
    }
`

export const Col=({width= '100%', flexGrow = '1', alignItems='center', justifyContent ='flex-start', children})=>(
    <ColStyle width={width} flexGrow={flexGrow} alignItems={alignItems} justifyContent={justifyContent}>
        {children}
    </ColStyle>
)
=======
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
>>>>>>> 3e00e064304a93e4b7f4a7273f9d446e29f788a1
