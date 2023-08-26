import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import BusTicketBookingABI from './contracts/BusTicketBookingABI.json';

function App() {
  const [contract, setContract] = useState(null);
  const [totalSeats, setTotalSeats] = useState(0);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [account, setAccount] = useState(null);
  const [seatNumber, setSeatNumber] = useState('');
  const [bookingResult, setBookingResult] = useState('');
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    initializeProvider();
  }, []);

  const initializeProvider = async () => {
    const detectedProvider = await detectEthereumProvider();
    if (detectedProvider) {
      const provider = new ethers.providers.Web3Provider(detectedProvider);
      setProvider(provider);
      await loadAccount(provider);
    } else {
      console.error('Please install MetaMask to interact with the wallet.');
    }
  };

  const initializeContract = async (provider) => {
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with actual contract address
    const contract = new ethers.Contract(contractAddress, BusTicketBookingABI.abi, provider.getSigner());
    setContract(contract);

    const seats = await contract.totalSeats();
    const available = await contract.checkAvailability();
    setTotalSeats(seats.toNumber());
    setAvailableSeats(available.toNumber());
  };

  const loadAccount = async (provider) => {
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      await initializeContract(provider);
    } catch (error) {
      console.error('Error connecting to the wallet:', error);
    }
  };

  const bookSeat = async () => {
    if (!contract || !account || !seatNumber) return;

    try {
      const seat = parseInt(seatNumber);

      const bookedSeat = await contract.getBookingDetails(account);
      if (bookedSeat > 0) {
        setBookingResult(`Error: You have already booked seat ${bookedSeat}`);
        return;
      }

      const gasLimit = await contract.estimateGas.bookSeat(seat, { value: await contract.pricePerSeat() });
      const tx = await contract.bookSeat(seat, { value: await contract.pricePerSeat(), gasLimit });
      await tx.wait();
      setBookingResult(`Seat ${seat} booked successfully!`);
      setAvailableSeats(availableSeats - 1);
    } catch (error) {
      setBookingResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Bus Ticket Booking</h1>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={initializeProvider}>Connect Wallet</button>
      )}
      <p>Total Seats: {totalSeats}</p>
      <p>Available Seats: {availableSeats}</p>

      <div>
        <input
          type="number"
          placeholder="Enter seat number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
        />
        <button onClick={bookSeat}>Book Seat</button>
      </div>

      <p>{bookingResult}</p>
    </div>
  );
}

export default App;
