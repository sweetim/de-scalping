import {
  JPYC,
  TicketERC20,
  USDT,
} from "../typechain-types"
import { persistToEnvFie } from "./persistToEnvFile"
import { deployContract } from "./utils"

export default async function() {
  const ticketErc20: TicketERC20 = await deployContract(
    "TicketERC20",
    [],
  ) as any

  const TICKET_ERC20_ADDRESS = await ticketErc20.getAddress()

  const usdt: USDT = await deployContract(
    "USDT",
    [],
  ) as any

  const USDT_ADDRESS = await usdt.getAddress()

  const jpyc: JPYC = await deployContract(
    "JPYC",
    [],
  ) as any

  const JPYC_ADDRESS = await jpyc.getAddress()

  persistToEnvFie({
    TICKET_ERC20_ADDRESS,
    JPYC_ADDRESS,
    USDT_ADDRESS,
  })

  console.table({
    TICKET_ERC20_ADDRESS,
    JPYC_ADDRESS,
    USDT_ADDRESS,
  })
}
