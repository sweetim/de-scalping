import { TicketShopFactory } from "../typechain-types"
import { deployContract } from "./utils"

export default async function() {
  const ticketShopFactory: TicketShopFactory = await deployContract(
    "TicketShopFactory",
    [],
  ) as any
  const ticketShopFactoryAddress = await ticketShopFactory.getAddress()

  console.table({
    ticketShopFactoryAddress,
  })
}
