import {
  JPYC,
  TicketERC20,
  USDT,
} from "../typechain-types"
import { deployContract } from "./utils"

export default async function() {
  const ticketErc20: TicketERC20 = await deployContract(
    "TicketERC20",
    [],
  ) as any

  const ticketErc20Address = await ticketErc20.getAddress()

  const usdt: USDT = await deployContract(
    "USDT",
    [],
  ) as any

  const usdtAddress = await usdt.getAddress()

  const jpyc: JPYC = await deployContract(
    "JPYC",
    [],
  ) as any

  const jpycAddress = await jpyc.getAddress()

  console.table({
    ticketErc20Address,
    usdtAddress,
    jpycAddress,
  })
}
