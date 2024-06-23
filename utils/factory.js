import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x145810eed8E9F0c4Ef8253507daa906E8AD1078b'
);

export default instance;
