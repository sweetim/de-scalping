//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TicketSchema.sol";
import "./TicketShop.sol";

contract TicketShopFactory {
    TicketShop[] public ticketShops;

    event TicketShopCreated(
        address indexed owner,
        address indexed ticketShop
    );

    function createTicketShop(
        TicketSchema.Metadata memory ticketMetadata,
        address allowedErc20Token
    ) payable external {
        TicketShop ticketShop = new TicketShop(
            ticketMetadata,
            allowedErc20Token
        );

        ticketShops.push(ticketShop);

        emit TicketShopCreated(msg.sender, address(ticketShop));
    }

    function getTicketShops() external view returns (TicketShop[] memory) {
        return ticketShops;
    }
}
