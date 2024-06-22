// pages/index.js
import React, { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import Header from '../components/header';

const Home = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    loadAccount();
  }, []);

  return (
    <div>
      <Header />
      <p>Connected Account: {account}</p>
    </div>
  );
};

export default Home;
