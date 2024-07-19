import {
  Ticket,
  TicketShop,
} from "../generated/schema"
import { TicketPurchase } from "../generated/templates/TicketShop/contracts_TicketShop_sol_TicketShop"

export function handleTicketPurchase(event: TicketPurchase): void {
  const id = event.transaction.hash

  const ticketShop = TicketShop.load(event.params.ticketShop)

  let entity = new Ticket(id)
  entity.timestamp = event.block.timestamp
  entity.owner = event.params.buyer
  entity.ticketShop = event.params.ticketShop
  entity.ticketTypeIndex = event.params.ticketTypeIndex
  entity.ticketId = event.params.ticketId

  if (ticketShop) {
    entity.ticketName = ticketShop.ticketMetadata_name
  }

  entity.save()
}
