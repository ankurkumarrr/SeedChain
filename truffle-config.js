module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '5777', // Match any network id
    },
  },
  contracts_directory: './contracts',
  contracts_build_directory: './build/contracts',
  compilers: {
    solc: {
      version: '0.8.13',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
