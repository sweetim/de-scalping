//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TicketMaster {
  struct TicketMetadata {
    string title;
    string description;
    string uri;
    uint availableTickets;
    TicketLocation location;
    TicketPricing pricing_1;
    TicketPricing pricing_2;
    TicketPricing pricing_3;
    TicketPricing pricing_4;
  }

  struct TicketLocation {
    string name;
    string uri;
  }

  struct TicketPricing {
    string name;
    string description;
    uint amount;
  }

  mapping(string => TicketMetadata) tickets;

  constructor() {
  }

  function createNewTicket(string calldata uuid, TicketMetadata calldata ticketMetadata) public {
    tickets[uuid] = ticketMetadata;
  }

  function buyTicket(string calldata ticketUuid, string calldata ticketType) public {
    TicketMetadata memory metadata = tickets[ticketUuid];
    metadata.availableTickets -= 1;
    tickets[ticketUuid] = metadata;
  }

  function getTicketMetadata(string calldata uuid) public view returns(TicketMetadata memory) {
    return tickets[uuid];
  }
}
