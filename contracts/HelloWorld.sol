// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@erc725/smart-contracts/contracts/ERC725.sol";


contract HelloWorld is ERC725 {
    string private _greeting;

    // Event to emit when the greeting is updated
    event GreetingUpdated(string newGreeting);

    // Constructor to set the initial greeting
    constructor(string memory initialGreeting) ERC725(msg.sender) {
        _greeting = initialGreeting;
    }

    // Function to get the current greeting
    function greet() public view returns (string memory) {
        return _greeting;
    }

    // Function to update the greeting
    function updateGreeting(string memory newGreeting) public onlyOwner {
        _greeting = newGreeting;
        emit GreetingUpdated(newGreeting);
    }
}
