//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TicketCollection {
  struct TicketMetadata {
    string title;
    string description;
    string uri;
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

  mapping(string => TicketMetadata) public ticketCollection;
  TicketMetadata[] public collection;

  constructor() {
  }

  function createNewCollection(string calldata uuid, TicketMetadata calldata ticketMetadata) public {
    ticketCollection[uuid] = ticketMetadata;
  }

  function getTicketMetadata(string calldata uuid) public view returns(TicketMetadata memory) {
    return ticketCollection[uuid];
  }

  function buyTicket(string calldata ticketUuid, string calldata ticketType) public {
    // TicketMetadata memory metadata = tickets[ticketUuid];
    // metadata.tickets -= 1;
    // tickets[ticketUuid] = metadata;
  }
}
