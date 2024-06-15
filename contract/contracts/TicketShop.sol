//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./nft/TicketNFT.sol";

contract TicketShop {
  struct TicketMetadata {
    string id;
    string title;
    string description;
    string uri;
    string[] dates;
    TicketLocation location;
    TicketPricing[] pricing;
  }

  struct TicketLocation {
    string name;
    string uri;
  }

  struct TicketPricing {
    string name;
    string description;
    uint price;
    uint tickets;
  }

  mapping(string => TicketMetadata) public ticketShop;
  TicketMetadata[] public collection;
  uint value = 0;
  TicketNFT ticketNft;

  constructor() {
  }

  function createNewCollection(string calldata uuid, TicketMetadata calldata ticketMetadata) public {
    ticketShop[uuid] = ticketMetadata;
    collection.push(ticketMetadata);

    ticketNft = new TicketNFT(ticketMetadata.title, ticketMetadata.description);
  }

  function getAllCollection() public view returns(TicketMetadata[] memory) {
    return collection;
  }

  function getTicketMetadata(string calldata uuid) public view returns(TicketMetadata memory) {
    return ticketShop[uuid];
  }

  function buyTicket(string calldata ticketUuid, uint ticketTypeIndex) public {
    ticketShop[ticketUuid].pricing[ticketTypeIndex].tickets -= 1;
    ticketNft.mint(msg.sender, "");
  }
}
