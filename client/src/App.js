import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const alchemyUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_PROJECT_ID}`;
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
       
      </header>
    </div>
  );
}

export default App;
