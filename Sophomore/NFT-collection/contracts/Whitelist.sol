// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Whitelist {
    // set the maximum no. of members to be whitelisted
    uint public maxWhitelisted;

    // create a dictionary of members who are whitelisted
    mapping(address => bool) public whiteListed;

    // track the no. of whitelisted members
    uint public whitelistCount;

    // initiate maximum no. of whiteListed members
    constructor(uint _maxWhitelisted) {
        maxWhitelisted = _maxWhitelisted;
    }

    // add a member to the whitelist
    function addToWhitelist() public {
        // check if the member is already whitelisted and if the no. of whitelisted members is less than max no. of whitelisted members
        require(
            !whiteListed[msg.sender],
            "This address has already been whitelisted."
        );
        require(
            whitelistCount < maxWhitelisted,
            "Cannot add more members. Limit reached."
        );

        // whitelist the member and increment the no. of whitelisted members
        whiteListed[msg.sender] = true;
        whitelistCount++;
    }
}
