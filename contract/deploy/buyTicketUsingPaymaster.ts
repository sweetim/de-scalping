import * as ethers from "ethers"
import { formatEther } from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { utils } from "zksync-ethers"
import {
  TicketShop,
  USDT,
} from "../typechain-types"
import {
  getProvider,
  getWallet,
} from "./utils"

const TICKET_SHOP_ADDRESS = "0x0D2bc86C73a0Ec8C13B26ed6f41d4729Eb27D7Fd"
const USDT_ADDRESS = process.env.USDT_ADDRESS

if (!USDT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function(hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet()
  const provider = getProvider()

  const ticketShopContractArtifact = await hre.artifacts.readArtifact(
    "TicketShop",
  )

  const ticketShop: TicketShop = new ethers.Contract(
    TICKET_SHOP_ADDRESS,
    ticketShopContractArtifact.abi,
    getWallet(),
  ) as any

  const usdtContractArtifact = await hre.artifacts.readArtifact(
    "USDT",
  )

  const usdt: USDT = new ethers.Contract(
    USDT_ADDRESS!,
    usdtContractArtifact.abi,
    getWallet(),
  ) as any

  const userBalance_usdt = await usdt.balanceOf(wallet.address)
  console.log(`USDT balance = ${userBalance_usdt}`)

  const shopPaymasterAddress = await ticketShop.getShopPaymasterAddress()
  const shopPaymasterBalance = await provider.getBalance(shopPaymasterAddress)
  console.log(`Paymaster ETH balance = ${formatEther(shopPaymasterBalance)}`)

  await (
    await usdt.approve(TICKET_SHOP_ADDRESS, BigInt(1_000))
  ).wait()

  const paymasterParams = utils.getPaymasterParams(
    shopPaymasterAddress,
    {
      type: "General",
      innerInput: new Uint8Array(),
    },
  )

  await (await ticketShop.buyTicket(
    BigInt(0),
    {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    },
  )).wait()

  console.log("Ticket purchase done")
}
