import {
  TicketShopCreated,
} from "../generated/contracts/TicketShopFactory.sol:TicketShopFactory/contracts_TicketShopFactory_sol_TicketShopFactory"
import { TicketShop as TicketShopTemplate } from "../generated/templates"

import { BigInt } from "@graphprotocol/graph-ts"
import {
  TicketMetadata,
  TicketShop,
} from "../generated/schema"

export function handleTicketShopCreated(event: TicketShopCreated): void {
  let ticketShopEntity = new TicketShop(event.params.ticketShop)
  ticketShopEntity.timestamp_s = event.block.timestamp
  ticketShopEntity.owner = event.params.owner
  ticketShopEntity.ticketShop = event.params.ticketShop

  let metadataEntity = new TicketMetadata(
    event.params.ticketShop,
  )

  metadataEntity.price = event.params.ticketMetadata.pricing.map<BigInt>(item => item.price)
  metadataEntity.totalTickets = event.params.ticketMetadata.pricing.map<BigInt>(item => item.totalTickets)
  metadataEntity.name = event.params.ticketMetadata.pricing.map<string>(
    item => item.name,
  )
  metadataEntity.save()

  ticketShopEntity.ticketMetadata = metadataEntity.id

  ticketShopEntity.save()

  TicketShopTemplate.create(event.params.ticketShop)
}
