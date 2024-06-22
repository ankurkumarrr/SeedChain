require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777'
    },
  },
  contracts_directory: './ethereum/contracts',
  contracts_build_directory: './ethereum/build',
  compilers: {
    solc: {
      version: '0.8.26',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
