// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint min) public {
        Campaign newCampaign = new Campaign(min, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    } 

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    constructor(uint min, address creator) {
        manager = creator;    
        minContribution = min;
    }

    function contribute() public payable {
        require(msg.value > minContribution);

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    } 

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
        
    }

    function approveRequest(uint index) public  {
        Request storage request = requests[index];

        require(approvers[msg.sender], "Only approvers can approve requests");
        require(!request.approvals[msg.sender], "You have already approved this request");
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount/2), "Not enough approvals");
        require(!request.complete, "Request already finalized");
        require(address(this).balance >= request.value, "Not enough balance in the contract");

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}