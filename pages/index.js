import React, { useEffect, useState } from 'react';
import factory from '../utils/factory';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        // Wait for the factory instance to be initialized
        await factory;

        // Fetch the deployed campaigns
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        setCampaigns(campaigns);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  return (
    <div>
      <h1>Deployed Campaigns</h1>
      {loading ? (
        <p>Loading...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <ul>
          {campaigns.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
