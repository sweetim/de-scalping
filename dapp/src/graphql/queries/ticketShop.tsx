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
      ticketPrice
      ticketName
      ticketTypeIndex
    }
  }
`)
