import { TicketShopCreated } from "../generated/TicketShopFactory/TicketShopFactoryContract"
import { TicketShopContract } from "../generated/TicketShopFactory/TicketShopContract"
import { TicketShop as TicketShopTemplate } from "../generated/templates"

import { BigInt } from "@graphprotocol/graph-ts"
import {
  TicketMetadata,
  TicketPricing,
  TicketShop,
} from "../generated/schema"

export function handleTicketShopCreated(event: TicketShopCreated): void {
  let ticketShopContract = TicketShopContract.bind(
    event.params.ticketShop,
  )

  let ticketPricing = new TicketPricing(event.params.ticketShop)
  ticketPricing.name = ticketShopContract.getTicketMetadata().pricing.map<string>(item => item.name)
  ticketPricing.description = ticketShopContract.getTicketMetadata().pricing.map<string>(item => item.description)
  ticketPricing.price = ticketShopContract.getTicketMetadata().pricing.map<BigInt>(item => item.price)
  ticketPricing.totalTickets = ticketShopContract.getTicketMetadata().pricing.map<BigInt>(item => item.totalTickets)
  ticketPricing.soldTickets = ticketShopContract.getTicketMetadata().pricing.map<BigInt>(item => item.soldTickets)
  ticketPricing.save()

  let ticketMetadata = new TicketMetadata(event.params.ticketShop)
  ticketMetadata.name = ticketShopContract.getTicketMetadata().name
  ticketMetadata.description = ticketShopContract.getTicketMetadata().description
  ticketMetadata.uri = ticketShopContract.getTicketMetadata().uri
  ticketMetadata.dates = ticketShopContract.getTicketMetadata().dates
  ticketMetadata.location_name = ticketShopContract.getTicketMetadata().location.name
  ticketMetadata.location_uri = ticketShopContract.getTicketMetadata().location.uri
  ticketMetadata.pricing = ticketPricing.id
  ticketMetadata.save()

  let ticketShopEntity = new TicketShop(event.params.ticketShop)
  ticketShopEntity.timestamp_s = event.block.timestamp
  ticketShopEntity.ownerAddress = event.params.owner
  ticketShopEntity.ticketShopAddress = event.params.ticketShop
  ticketShopEntity.erc20TokenAddress = ticketShopContract.getSupportedErc20Tokens()
  ticketShopEntity.paymasterAddress = ticketShopContract.getShopPaymasterAddress()
  ticketShopEntity.nftAddress = ticketShopContract.getNftAddress()
  ticketShopEntity.totalTickets = ticketShopContract.getTicketMetadata()
    .pricing.reduce((acc, item) => acc.plus(item.totalTickets), BigInt.fromI32(0))
  ticketShopEntity.metadata = ticketMetadata.id

  ticketShopEntity.save()

  TicketShopTemplate.create(event.params.ticketShop)
}
