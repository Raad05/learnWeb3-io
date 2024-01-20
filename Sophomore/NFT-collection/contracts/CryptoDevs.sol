// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    uint256 public constant price = 0.01 ether;
    uint256 public constant maxTokenIds = 20;

    Whitelist whitelist;

    uint256 public reservedTokens;
    uint256 public reservedTokensClaimed;

    constructor(
        address initialOwner
    ) ERC721("Crypto Devs", "CD") Ownable(initialOwner) {
        whitelist = Whitelist(initialOwner);
        reservedTokens = whitelist.maxWhitelisted();
    }

    function mint() public payable {
        require(
            totalSupply() + reservedTokens - reservedTokensClaimed <
                maxTokenIds,
            "Exceeded maximum supply"
        );
        if (whitelist.whiteListed(msg.sender) && msg.value < price) {
            require(balanceOf(msg.sender) == 0, "Already owned");
            reservedTokensClaimed++;
        } else {
            require(msg.value >= price, "Not enough Ether");
        }
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
