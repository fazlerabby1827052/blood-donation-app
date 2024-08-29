import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './actions/store';
import DCandidates from './components/DCandidates';
import { Container } from '@mui/material';
function App() {
  return(
    <Provider store={store}>
      <Container maxWidth='lg'>
      <DCandidates/>
      </Container>
    </Provider>
  );
}

export default App
