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

export const TICKET_QUERY_BY_OWNER = gql(`
  query TicketQueryByOwner($owner: Bytes!) {
    tickets(
      where: {
        owner: $owner
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

export const TICKET_ACTIVITY_QUERY = gql(`
  query TicketActivityQuery($ticketShop: Bytes!) {
    tickets(
      where: {
        ticketShop: $ticketShop
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
