import { TicketShopFactory } from "../typechain-types"
import { persistToEnvFie } from "./persistToEnvFile"
import { deployContract } from "./utils"

export default async function() {
  const ticketShopFactory: TicketShopFactory = await deployContract(
    "TicketShopFactory",
    [],
  ) as any
  const TICKET_SHOP_FACTORY_ADDRESS = await ticketShopFactory.getAddress()

  persistToEnvFie({
    TICKET_SHOP_FACTORY_ADDRESS,
  })

  console.table({
    TICKET_SHOP_FACTORY_ADDRESS,
  })
}
