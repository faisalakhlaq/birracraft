import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import CheckboxExample from './navegation.js';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
        <CheckboxExample/>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button variant="contained" color="primary">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn REACT crack!
          </a>
          </Button>
        </header>
     </div>
    </React.Fragment>
  );
}

export default App;
