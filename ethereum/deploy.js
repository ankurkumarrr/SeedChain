const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'orchard tank dragon vapor climb draw letter average poverty ice thunder give', // Replace with your mnemonic
  'https://holesky.infura.io/v3/05489b0c1a4744e9a02a1db8f27f32ad' // Replace with your Infura endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    // Ensure correct bytecode retrieval
    const bytecode = compiledFactory.evm.bytecode.object;

    const contract = new web3.eth.Contract(compiledFactory.abi);

    // Deploy the contract
    const deployedContract = await contract.deploy({
      data: '0x' + bytecode // Ensure '0x' prefix is added to bytecode
    }).send({
      gas: web3.utils.toHex('1000000'), // Adjust gas limit as needed
      from: accounts[0]
    });

    console.log('Contract deployed to', deployedContract.options.address);
    provider.engine.stop(); // Stop the provider engine after deployment
  } catch (error) {
    console.error('Deployment error:', error);
    provider.engine.stop(); // Ensure provider engine is stopped on error
    process.exit(1); // Exit the process with an error code
  }
};

deploy().catch(err => {
  console.error('Unhandled promise rejection:', err);
  process.exit(1); // Exit the process with an error code if there's an unhandled rejection
});
