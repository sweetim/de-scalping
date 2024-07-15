import {
  TicketShopCreated,
} from "../generated/contracts/TicketShopFactory.sol:TicketShopFactory/contracts_TicketShopFactory_sol_TicketShopFactory"
import { TicketShop } from "../generated/schema"

export function handleTicketShopCreated(event: TicketShopCreated): void {
  let entity = new TicketShop(event.transaction.hash)

  entity.owner = event.params.owner
  entity.ticketShop = event.params.ticketShop

  entity.save()
}
