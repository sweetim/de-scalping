//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library TicketSchema {
    struct Metadata {
        string id;
        string name;
        string description;
        string uri;
        uint[2] dates;
        Location location;
        Pricing[] pricing;
    }

    struct Location {
        string name;
        string uri;
    }

    struct Pricing {
        string name;
        string description;
        uint price;
        uint tickets;
    }
}
