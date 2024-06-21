const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    console.error('Compilation errors:');
    output.errors.forEach(err => console.error(err.formattedMessage));
    process.exit(1);
}

fs.ensureDirSync(buildPath);

for (let contractFileName in output.contracts['Campaign.sol']) {
    const contractName = contractFileName.replace('.sol', '');
    const contract = output.contracts['Campaign.sol'][contractFileName];

    fs.outputJsonSync(
        path.resolve(buildPath, contractName + '.json'),
        contract
    );
}

console.log('Compilation successful!');
