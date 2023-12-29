import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
//import contractABI from './contracts/MyToken.json';

const alchemyUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_PROJECT_ID}`;
const web3 = new Web3(alchemyUrl);

const contractAddress = "0x695eEc877841a46116A944d1aEbfAe37dabC09F6"; // Replace with your contract address
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "participant",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "AdditionalBalanceEarned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "earnAdditionalBalance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]; 

const MyContract = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [userAccount, setUserAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
  
      // Request account access if needed
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          const account = accounts[0];
          setUserAccount(account);
  
          // Check if connected to Alchemy via MetaMask
          web3.eth.net.isListening()
            .then(() => {
              setIsConnected(true);
              // Fetch user's balance after connection
              fetchUserBalance(account);
            })
            .catch(() => {
              setIsConnected(false);
            });
        })
        .catch(() => {
          setIsConnected(false);
        });
    } else {
      setIsMetaMaskInstalled(false);
      setIsConnected(false);
    }
  }, []);
  

  const fetchUserBalance = async (address) => {
    try {
      console.log(address);
      let balance = await MyContract.methods.balanceOf(address).call();
      balance = Number(balance);
      setUserBalance(balance);
      console.log(userBalance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEarnBalance = async () => {
    try {
      const valueToAdd = 10; // Example value to add to the balance, you can modify this
      await MyContract.methods.earnAdditionalBalance(valueToAdd).send({ from: userAccount });
      // Transaction successful, update UI or show a success message
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleTransferTokens = async (toAddress, amount) => {
    try {
      await MyContract.methods.transfer(toAddress, amount).send({ from: userAccount });
      // Transaction successful, update UI or show a success message
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

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
        <p>User :{userBalance}</p>
        {/* Display user's balance fetched from the blockchain */}
        {/*<button onClick={() => handleCheckBalance()}>Check Balance</button>*/}
        <button onClick={() => handleEarnBalance()}>Earn Balance</button>
        {/*<button onClick={() => handleTransferTokens('ADDRESS_TO_SEND_TO', 20)}>Transfer Tokens</button>*/}
        {/* Replace 'ADDRESS_TO_SEND_TO' with the recipient's Ethereum address */}
      </header>
    </div>
  );
}

export default App;
