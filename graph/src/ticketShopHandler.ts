import { log } from "@graphprotocol/graph-ts"
import {
  Ticket,
  TicketMetadata,
  TicketPricing,
} from "../generated/schema"
import {
  TicketPurchase,
  TicketShopContract,
} from "../generated/templates/TicketShop/TicketShopContract"

export function handleTicketPurchase(event: TicketPurchase): void {
  const id = event.transaction.hash

  const ticketMetadata = TicketMetadata.load(event.params.ticketShop)
  const ticketPricing = TicketPricing.load(event.params.ticketShop)

  let entity = new Ticket(id)
  entity.transactionHash = event.transaction.hash
  entity.timestamp_s = event.block.timestamp
  entity.owner = event.params.buyer
  entity.ticketShop = event.params.ticketShop
  entity.ticketTypeIndex = event.params.ticketTypeIndex
  entity.ticketId = event.params.ticketId

  if (ticketPricing) {
    entity.ticketName = ticketPricing.name[
      event.params.ticketTypeIndex.toI32()
    ]

    entity.ticketPrice = ticketPricing.price[
      event.params.ticketTypeIndex.toI32()
    ]
  }

  let ticketShopContract = TicketShopContract.bind(
    event.params.ticketShop,
  )

  entity.erc20TokenAddress = ticketShopContract.getSupportedErc20Tokens()
  entity.nftAddress = ticketShopContract.getNftAddress()

  entity.save()
}
