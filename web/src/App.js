import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar.js';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
        <TopBar/>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn REACT crack!
          </a>
        </header>
     </div>
    </React.Fragment>
  );
}

export default App;
