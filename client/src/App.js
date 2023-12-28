import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const alchemyUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_PROJECT_ID}`;
const web3 = new Web3(alchemyUrl);

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);

      // Check if connected to Alchemy via MetaMask
      web3.eth.net.isListening()
        .then(() => {
          setIsConnected(true);
        })
        .catch(() => {
          setIsConnected(false);
        });
    } else {
      setIsMetaMaskInstalled(false);
      setIsConnected(false);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {isMetaMaskInstalled
            ? isConnected
              ? 'Connected to Alchemy via MetaMask'
              : 'Not connected to Alchemy via MetaMask'
            : 'MetaMask is not installed'}
        </p>
      </header>
    </div>
  );
}

export default App;
