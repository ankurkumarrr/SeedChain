pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {

    address public manager;
    unit public minimumContribution;
    address[] public approvers;

    function Campaign (uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

}   