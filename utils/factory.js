import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json';

const getFactoryAddress = async () => {
  const response = await fetch('/api/getFactoryAddress');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch contract address');
  }
  return data.address;
};

let instance;
const initializeInstance = async () => {
  if (!instance) {
    const factoryAddress = await getFactoryAddress();
    instance = new web3.eth.Contract(CampaignFactory.abi, factoryAddress);
  }
};

initializeInstance();

export default instance;
