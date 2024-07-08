import {
  Ticket,
  TicketMetadata,
} from "../generated/schema"
import { TicketPurchase } from "../generated/templates/TicketShop/contracts_TicketShop_sol_TicketShop"

export function handleTicketPurchase(event: TicketPurchase): void {
  const id = event.transaction.hash

  const ticketMetadata = TicketMetadata.load(event.params.ticketShop)

  let entity = new Ticket(id)
  entity.transactionHash = event.transaction.hash
  entity.timestamp_s = event.block.timestamp
  entity.owner = event.params.buyer
  entity.ticketShop = event.params.ticketShop
  entity.ticketTypeIndex = event.params.ticketTypeIndex
  entity.ticketId = event.params.ticketId

  if (ticketMetadata) {
    entity.ticketName = ticketMetadata.name[
      event.params.ticketTypeIndex.toI32()
    ]

    entity.ticketPrice = ticketMetadata.price[
      event.params.ticketTypeIndex.toI32()
    ]
  }

  entity.save()
}
