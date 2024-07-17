//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./TicketSchema.sol";
import "./nft/TicketNFT.sol";
import "./paymasters/ShopPaymaster.sol";

contract TicketShop {
    IERC20 private immutable erc20Token;
    TicketSchema.Metadata private ticketMetadata;
    TicketNFT private immutable ticketNft;
    ShopPaymaster private immutable shopPaymaster;

    event TicketPurchase(
        address indexed ticketShop,
        address indexed buyer,
        uint ticketTypeIndex,
        uint ticketId
    );

    constructor(
        TicketSchema.Metadata memory _ticketMetadata,
        address _allowedErc20Token
    ) payable {
        ticketMetadata = _ticketMetadata;

        for (uint i = 0; i < ticketMetadata.pricing.length; i++) {
            ticketMetadata.pricing[i].soldTickets = 0;
        }

        erc20Token = IERC20(_allowedErc20Token);
        ticketNft = new TicketNFT(_ticketMetadata.name, "TICKET");
        shopPaymaster = new ShopPaymaster(_allowedErc20Token);
    }

    function getTicketMetadata()
        public
        view
        returns (TicketSchema.Metadata memory)
    {
        return ticketMetadata;
    }

    function getNftAddress() external view returns (address) {
        return address(ticketNft);
    }

    function getShopPaymasterAddress() external view returns (address) {
        return address(shopPaymaster);
    }

    function getSupportedErc20Tokens() external view returns (address) {
        return address(erc20Token);
    }

    function buyTicket(uint ticketTypeIndex) external {
        uint ticketPrice = ticketMetadata.pricing[ticketTypeIndex].price;
        uint ticketsLeft = ticketMetadata.pricing[ticketTypeIndex].totalTickets
            - ticketMetadata.pricing[ticketTypeIndex].soldTickets;

        uint allowance = erc20Token.allowance(msg.sender, address(this));
        bool hasTicketAlready = ticketNft.balanceOf(msg.sender) < 10;

        require(allowance >= ticketPrice, "not enough allowance");
        require(hasTicketAlready, "only allow to purchase 1 ticket");
        require(ticketsLeft > 0, "tickets sold out");


        erc20Token.transferFrom(msg.sender, address(this), ticketPrice);

        string memory uri = generateUri(ticketTypeIndex);
        ticketNft.mint(msg.sender, uri);

        uint ticketId = ticketMetadata.pricing[ticketTypeIndex].soldTickets;
        ticketMetadata.pricing[ticketTypeIndex].soldTickets += 1;

        emit TicketPurchase(
            address(this),
            msg.sender,
            ticketTypeIndex,
            ticketId);
    }

    function generateUri(
        uint ticketTypeIndex
    ) internal view returns (string memory) {
        bytes memory uriData = abi.encodePacked(
             "{",
                '"name":"', ticketMetadata.name, '",'
                '"description":"', ticketMetadata.description, '",'
                '"image":"', ticketMetadata.uri, '",'
                '"attributes": [',
                    "{",
                        '"display_type": "date",'
                        '"trait_type": "Start date",'
                        '"value":', Strings.toString(ticketMetadata.dates[0]),
                    "},",
                    "{",
                        '"display_type": "date",'
                        '"trait_type": "End date",'
                        '"value":', Strings.toString(ticketMetadata.dates[1]),
                    "},",
                    "{",
                        '"trait_type": "Location name",'
                        '"value":"', ticketMetadata.location.name, '"'
                    "},",
                    "{",
                        '"trait_type": "Location uri",'
                        '"value":"', ticketMetadata.location.uri, '"'
                    "},",
                    "{",
                        '"trait_type": "Ticket type",'
                        '"value":"', ticketMetadata.pricing[ticketTypeIndex].name, '"'
                    "},",
                    "{",
                        '"trait_type": "Ticket description",'
                        '"value":"', ticketMetadata.pricing[ticketTypeIndex].description, '"'
                    "},",
                    "{",
                        '"trait_type": "Ticket price",'
                        '"value":', Strings.toString(ticketMetadata.pricing[ticketTypeIndex].price),
                    "},",
                    "{",
                        '"trait_type": "Ticket ID",'
                        '"value":', Strings.toString(ticketMetadata.pricing[ticketTypeIndex].soldTickets),
                    "}",
                "]"
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(abi.encodePacked(uriData))
                )
            );
    }
}
