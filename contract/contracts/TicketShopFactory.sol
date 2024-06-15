//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./TicketSchema.sol";
import "./TicketShop.sol";

contract TicketShopFactory {
    TicketShop[] public ticketShops;

    function createTicketShop(
        TicketSchema.Metadata memory ticketMetadata,
        address allowedErc20Token
    ) payable external {
        TicketShop ticketShop = new TicketShop(
            ticketMetadata,
            allowedErc20Token
        );

        ticketShops.push(ticketShop);
    }

    function getTicketShops() external view returns (TicketShop[] memory) {
        return ticketShops;
    }
}
