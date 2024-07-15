import { gql } from "@apollo/client"

const TICKET_SHOP_QUERY = gql`
  query TicketShopQuery($id: ID!) {
    ticketShops(where: { owner: $id }) {
      id
      owner
      ticketShop
    }
  }
`

export default TICKET_SHOP_QUERY
