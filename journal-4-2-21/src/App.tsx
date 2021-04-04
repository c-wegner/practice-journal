import React from 'react';
import { GlobalStyle } from "./globals/styles";
import { Main } from './views/main.view';


function App() {
  return (
    <div>
      <GlobalStyle />
      <Main/>
    </div>
  );
}

export default App;
