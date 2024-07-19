import { gql } from "@/__generated__/gql"

export const TICKET_SHOP_QUERY = gql(`
  query TicketShopQuery($owner: Bytes!) {
    ticketShops(where: { owner: $owner }) {
      id
      owner
      ticketShop
    }
  }
`)

export const TICKET_QUERY = gql(`
  query TicketQuery($owner: Bytes!) {
    tickets(where: { owner: $owner }) {
      id
      owner
      ticketShop
      ticketId
      ticketTypeIndex
      ticketName
      timestamp
    }
  }
`)

export const TICKET_QUERY_ALL = gql(`
  query TicketQueryAll() {
    tickets {
      id
      owner
      ticketShop
      ticketId
      ticketTypeIndex
      ticketName
      timestamp
    }
  }
`)

export const TICKET_QUERY_BY_TICKET_SHOP = gql(`
  query TicketQueryByOwner($ticketShop: Bytes!) {
    tickets(where: { ticketShop: $ticketShop }) {
      id
      owner
      ticketShop
      ticketId
      ticketTypeIndex
      ticketName
      timestamp
    }
  }
`)
