// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../TicketSchema.sol";

contract TicketNFT is
    ERC721URIStorage,
    ERC721Burnable,
    Ownable,
    AccessControlEnumerable
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    constructor(string memory collectionName, string memory symbol) ERC721(collectionName, symbol) {
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function registerBurner(address burner) external onlyOwner {
        _grantRole(BURNER_ROLE, burner);
    }

    function getAllBurner() public view returns (address[] memory) {
        uint count = getRoleMemberCount(BURNER_ROLE);

        address[] memory output = new address[](count);
        for (uint i = 0; i < count; i++) {
            output[i] = getRoleMember(BURNER_ROLE, i);
        }

        return output;
    }

    function approveAllBurner(uint256 tokenId) internal {
        uint count = getRoleMemberCount(BURNER_ROLE);
        for (uint i = 0; i < count; i++) {
            address burnerAddress = getRoleMember(BURNER_ROLE, i);
            _approve(burnerAddress, tokenId);
        }
    }

    function mint(address to, string calldata uri) external onlyOwner {
        _tokenIdTracker.increment();
        _mint(to, _tokenIdTracker.current());
        _setTokenURI(_tokenIdTracker.current(), uri);
        approveAllBurner(_tokenIdTracker.current());
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(
            from == address(0) || to == address(0),
            "Token not transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
