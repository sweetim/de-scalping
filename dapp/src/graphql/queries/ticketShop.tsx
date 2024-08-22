import { gql } from "@/__generated__/gql"

export const TICKET_SHOP_QUERY = gql(`
  query TicketShopQuery($ownerAddress: Bytes!) {
    ticketShops(where: { ownerAddress: $ownerAddress }) {
      id
      ownerAddress
      ticketShopAddress
    }
  }
`)

export const TICKET_QUERY = gql(`
  query TicketQueryByOwner($owner: Bytes!, $ticketShop: Bytes!) {
    tickets(
      where: {
        owner_contains: $owner,
        ticketShop_contains: $ticketShop
      }
    ) {
      id
      owner
      ticketId
      ticketName
      ticketShop
      ticketTypeIndex
      ticketPrice
      timestamp_s
      transactionHash
    }
  }
`)
