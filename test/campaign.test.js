const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");

contract("CampaignFactory", accounts => {
  let factoryInstance;
  let campaignInstance;
  const minContribution = web3.utils.toWei("0.1", "ether"); // Example minimum contribution

  // Before each test, deploy a new instance of CampaignFactory
  beforeEach(async () => {
    factoryInstance = await CampaignFactory.new({ from: accounts[0] });
  });

  // Test case to check deployment of CampaignFactory and Campaign
  it("deploys a factory and a campaign", async () => {
    assert.ok(factoryInstance.address);
    
    // Create a new campaign through the factory
    await factoryInstance.createCampaign(minContribution, { from: accounts[0] });

    // Retrieve the deployed campaign address
    const campaigns = await factoryInstance.getDeployedCampaigns();
    campaignInstance = await Campaign.at(campaigns[0]);

    assert.ok(campaignInstance.address);
  });

  // Additional test cases

});
