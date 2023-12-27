import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

//const { REACT_APP_PROJECT_ID } = process.env;
const alchemyUrl = `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_PROJECT_ID}`;
const web3 = new Web3(alchemyUrl);

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    web3.eth.net.isListening()
      .then(() => {
        setIsConnected(true);
      })
      .catch(() => {
        setIsConnected(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {isConnected ? 'Connected to Alchemy' : 'Not connected to Alchemy'}
        </p>
        {isConnected && (
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        )}
      </header>
    </div>
  );
}

export default App;
