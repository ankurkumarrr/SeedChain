const assert = require('assert');
const ganache = require('ganache-cli');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

const compiledContracts = {
    Campaign: require('../ethereum/build/Campaign.json'),
    CampaignFactory: require('../ethereum/build/CampaignFactory.json')
};

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Deploy the factory contract
    factory = await new web3.eth.Contract(compiledContracts.CampaignFactory.abi)
        .deploy({ data: '0x' + compiledContracts.CampaignFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '2000000', gasPrice: '20000000000' }); // Set a fixed gasPrice

    // Create a new campaign through the factory
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '2000000',
        gasPrice: '20000000000' // Set a fixed gasPrice
    });

    // Retrieve the address of the deployed campaign
    const addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];

    // Interact with the deployed campaign
    campaign = new web3.eth.Contract(
        compiledContracts.Campaign.abi,
        campaignAddress
    );
});

describe('Campaign', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
});
