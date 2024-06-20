// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignContract {

    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    Request[] public requests;
    address public manager;
    uint public minContribution;
    address[] public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint min) {
        manager = msg.sender;
        minContribution = min;
    }

    function Contribute() public payable {
        require(msg.value > minContribution);

        approvers.push(msg.sender);
    } 

    function createRequests(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });

        requests.push(newRequest); 
    }
}