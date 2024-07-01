# SeedChain Project README

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Environment Setup](#development-environment-setup)
  - [Ganache Setup](#ganache-setup)
    - [Ganache CLI Setup](#ganache-cli-setup)
    - [Ganache GUI Setup](#ganache-gui-setup)
- [Smart Contract Deployment](#smart-contract-deployment)
  - [Initial Deployment](#initial-deployment)
  - [Redeployment after Contract Changes](#redeployment-after-contract-changes)
- [Running Tests](#running-tests)
- [Starting the Development Server](#starting-the-development-server)
- [Updating Contract Addresses](#updating-contract-addresses)
  - [Updating web3.js Configuration](#updating-web3.js-configuration)
- [Additional Notes](#additional-notes)

## Overview

SeedChain is a decentralized crowdfunding platform built on the Ethereum blockchain. It allows users to create campaigns where contributors can fund projects and vote on funding proposals.

## Project Structure

The project is structured as follows:

```
SeedChain/
├── contracts/
│   ├── Campaign.sol
│   └── Migrations.sol
├── build/
│   ├── CampaignFactory.json
│   └── Campaign.json
│   └── Migrations.json
├── components/
├── pages/
├── utils/
│   ├── campaign.js
│   ├── factory.js
│   ├── web3.js
├── test/
│   └── campaign.test.js
├── truffle-config.js
├── package.json
├── README.md
└── ...
```

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (version >= 12)
- npm (Node Package Manager)
- Ganache (either CLI or GUI) for local Ethereum development
- Metamask plugin installed in your browser

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ankurkumarrr/SeedChain.git
   cd SeedChain
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Development Environment Setup

### Ganache Setup

Choose one of the following options based on your preference:

#### Ganache CLI Setup

1. Start Ganache CLI:

   ```bash
   ganache-cli
   ```

   Note the available accounts and their private keys.

2. Update `truffle-config.js` with the correct network settings:

   ```javascript
   module.exports = {
     networks: {
       development: {
         host: '127.0.0.1', // Localhost (default: ganache-cli running locally)
         port: 7545, // Ganache CLI port (default: 7545)
         network_id: '*', // Match any network id
         gas: 6721975, // Gas limit used for deploys (default: 6721975)
         gasPrice: 20000000000, // Gas price used for transactions (default: 20000000000)
       },
     },
     contracts_directory: './contracts', // Directory where Solidity contracts are located
     contracts_build_directory: './build/contracts', // Directory where compiled contracts are stored
     compilers: {
       solc: {
         version: '0.8.13', // Solidity compiler version
         settings: {
           optimizer: {
             enabled: true, // Enable optimizer (default: false)
             runs: 200, // Optimize for how many times to run the code (default: 200)
           },
         },
       },
     },
   };
   ```

#### Ganache GUI Setup

1. Start Ganache GUI.
2. Configure Truffle to connect to Ganache GUI by updating `truffle-config.js` with the correct network settings:

   ```javascript
   module.exports = {
     networks: {
       development: {
         host: '127.0.0.1', // Localhost
         port: 7545, // Ganache GUI port (default: 7545)
         network_id: '*', // Match any network id
         gas: 6721975, // Gas limit used for deploys (default: 6721975)
         gasPrice: 20000000000, // Gas price used for transactions (default: 20000000000)
       },
     },
     contracts_directory: './contracts', // Directory where Solidity contracts are located
     contracts_build_directory: './build/contracts', // Directory where compiled contracts are stored
     compilers: {
       solc: {
         version: '0.8.13', // Solidity compiler version
         settings: {
           optimizer: {
             enabled: true, // Enable optimizer (default: false)
             runs: 200, // Optimize for how many times to run the code (default: 200)
           },
         },
       },
     },
   };
   ```

Choose either Ganache CLI or Ganache GUI based on your preference. You do not need to install or use both.

## Smart Contract Deployment

### Initial Deployment

1. Compile contracts:

   ```bash
   truffle compile
   ```

2. Deploy contracts to Ganache or any Ethereum network:

   ```bash
   truffle migrate --network development
   ```

   Replace `development` with the appropriate network configuration in `truffle-config.js`.

### Redeployment after Contract Changes

1. Make changes to your contracts in `contracts/`.
2. Re-compile:

   ```bash
   truffle compile
   ```

3. Redeploy contracts:

   ```bash
   truffle migrate --reset --network development
   ```

## Running Tests

1. Ensure contracts are deployed to the testing network:

   ```bash
   truffle migrate --reset --network development
   ```

2. Run tests:

   ```bash
   npm run test
   ```

## Starting the Development Server

To run the SeedChain application:

```bash
npm run dev
```

This command starts the development server using Next.js, allowing you to view and interact with the SeedChain platform in your web browser.

## Updating Contract Addresses

1. After deploying or redeploying contracts, update the contract addresses.

   Example of updating the address in `factory.js`:

   ```javascript
   import web3 from './web3';
   import CampaignFactory from './build/CampaignFactory.json';

   const instance = new web3.eth.Contract(
     CampaignFactory.abi,
     '0xYourNewContractAddress'
   );

   export default instance;
   ```

Ensure to replace `'0xYourNewContractAddress'` with the actual address of your deployed contract.

### Updating `web3.js` Configuration

1. Update the Ganache RPC URL and port in `web3.js`:

   ```javascript
   import Web3 from 'web3';

   let web3;

   if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
     // In the browser and MetaMask is running.
     web3 = new Web3(window.ethereum);
     window.ethereum.request({ method: 'eth_requestAccounts' });
   } else {
     // On the server or MetaMask is not available.
     const provider = new Web3.providers.HttpProvider(
       `${process.env.NEXT_PUBLIC_GANACHE_RPC_URL}:${process.env.NEXT_PUBLIC_GANACHE_PORT}`
     );
     web3 = new Web3(provider);
   }

   export default web3;
   ```

Ensure to replace `${process.env.NEXT_PUBLIC_GANACHE_RPC_URL}` and `${process.env.NEXT_PUBLIC_GANACHE_PORT}` with the actual URL and port of your Ganache instance.

## Additional Notes

- Ensure Ganache (CLI or GUI) is running whenever interacting with the Ethereum network locally.
- For production deployment, consider using a testnet or mainnet configuration in `truffle-config.js`.
