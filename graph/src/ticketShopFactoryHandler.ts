import {
  TicketShopCreated,
} from "../generated/contracts/TicketShopFactory.sol:TicketShopFactory/contracts_TicketShopFactory_sol_TicketShopFactory"
import { TicketShop as TicketShopTemplate } from "../generated/templates"

import { TicketShop } from "../generated/schema"

export function handleTicketShopCreated(event: TicketShopCreated): void {
  let entity = new TicketShop(event.params.ticketShop)
  entity.owner = event.params.owner
  entity.ticketShop = event.params.ticketShop
  entity.timestamp = event.block.timestamp
  entity.ticketMetadata_id = event.params.ticketMetadata.id
  entity.ticketMetadata_name = event.params.ticketMetadata.name

  entity.save()

  TicketShopTemplate.create(event.params.ticketShop)
}
