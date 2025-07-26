import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const CONTRACT_ADDRESS = "0x158fCD984140bb836eE3E9B5beC4e56588322Ee1"; // Your Sepolia address
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType":"string","name":"_greeting","type":"string"}],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "inputs":[],
    "name":"greet",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"_greeting","type":"string"}],
    "name":"setGreeting",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"greeting",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view",
    "type":"function"
  }
];

function App() {
  const [greeting, setGreeting] = useState("");
  const [newGreeting, setNewGreeting] = useState("");

  const fetchGreeting = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const greet = await contract.greet();
    setGreeting(greet);
  };

  const updateGreeting = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.setGreeting(newGreeting);
    await tx.wait();
    fetchGreeting();
  };

  return (
    <div className="App">
      <h2>Greeter 📝</h2>
      <button onClick={fetchGreeting}>Get Greeting</button>
      <p>Current: {greeting}</p>

      <input
        type="text"
        value={newGreeting}
        onChange={(e) => setNewGreeting(e.target.value)}
        placeholder="New greeting"
      />
      <button onClick={updateGreeting}>Set Greeting</button>
    </div>
  );
}

export default App;

