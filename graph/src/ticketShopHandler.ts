import {
  Ticket,
  TicketShop,
} from "../generated/schema"
import { TicketPurchase } from "../generated/templates/TicketShop/contracts_TicketShop_sol_TicketShop"

export function handleTicketPurchase(event: TicketPurchase): void {
  const id = event.transaction.hash

  const ticketShop = new TicketShop(event.params.ticketShop)

  let entity = new Ticket(id)
  entity.owner = event.params.buyer
  entity.ticketShop = event.params.ticketShop
  entity.ticketTypeIndex = event.params.ticketTypeIndex
  entity.ticketId = event.params.ticketId
  // entity.ticketPrice = ticketShop
  entity.ticketName = ticketShop.ticketName

  entity.save()
}
