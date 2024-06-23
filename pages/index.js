import React, { Component } from 'react';
import factory from '../utils/factory';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};
  }

  render() {
    return (
      <div>
        <h1>Total Campaigns: {this.props.campaigns.length}</h1>
        <h1>{this.props.campaigns[0]}</h1>
        <h1>{this.props.campaigns[1]}</h1>
      </div>
    );
  }
}

export default CampaignIndex;
