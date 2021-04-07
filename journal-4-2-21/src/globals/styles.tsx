import styled, { createGlobalStyle } from 'styled-components';

export const values = {
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
}

export const GlobalStyle = createGlobalStyle`
    :root{
        font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif; 
        font-size: ${values.fontSize};
        background-color: ${values.backgroundColor};
        color: ${values.color}; 
        font-weight: ${values.fontWeight};
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

      label{
        font-size: .9rem;
        text-align: left;
      }
    
      input, textarea{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: ${values.fontSize};
        min-height: ${values.inputHeight};
        padding: ${values.padding};
        background-color: ${values.backgroundColor};
        border-radius: ${values.borderRadius};
        width: 100%;
      }
`;

export const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const RowStyle = styled.div<{justifyContent: string, alignItems: string}> `
      display: flex;
      flex-direction: column;

      @media(min-width: ${values.screen.md}){
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

    @media(min-width: ${values.screen.md}){
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

