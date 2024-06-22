import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // In the browser and MetaMask is running.
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
  // On the server or MetaMask is not available.
  const provider = new Web3.providers.HttpProvider(`${process.env.NEXT_PUBLIC_GANACHE_RPC_URL}:${process.env.NEXT_PUBLIC_GANACHE_PORT}`);
  web3 = new Web3(provider);
}

export default web3;
