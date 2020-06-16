import React from 'react';
import Header from './components/Header.js';
import styled from 'styled-components';
import Wrapper from './components/Wrapper.js';
import Table from './components/Table.js';

const AppStyled = styled.main`
  background-image: radial-gradient(circle at top, #1F3757 50%, #131537 100%);
  min-height: 100vh;
  padding: 2em;
  color: white;
  body{
    font-family: 'Barlow Semi Condensed', sans-serif;
  }
`

function App() {
  return (
    <AppStyled>

      <Wrapper>
        <Header/>
        <Table/>
      </Wrapper>
       
    </AppStyled>
  );
}

export default App;
