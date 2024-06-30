import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x463f9BDDc3eE1e3413f5e7B037F933D166FB76f1' //check on remix.ethereum.org/
);

export default instance;
