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

    function Campaign(uint min) public {
        manager = msg.sender;
        minContribution = min;
    }

    function Contribute() public payable {
        require(msg.value > minContribution);

        approvers.push(msg.sender);
    } 
}