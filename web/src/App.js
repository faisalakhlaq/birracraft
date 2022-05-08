import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import TopBar from './components/TopBar.js';
import Contents from './components/Contents.js';
import Footer from './components/Footer.js';


function App() {
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          <TopBar />
          <Container sx={{ mt: 12 }}>
            <Contents />
          </Container>
          <Footer />
        </BrowserRouter>
     </div>
    </React.Fragment>
  );
}

export default App;
