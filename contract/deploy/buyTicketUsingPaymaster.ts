import * as ethers from "ethers"
import { formatEther } from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { utils } from "zksync-ethers"
import {
  TicketShop,
  TicketShopFactory,
  USDT as JPYC,
} from "../typechain-types"
import {
  getProvider,
  getWallet,
} from "./utils"

const TICKET_SHOP_ADDRESS = "0x0D2bc86C73a0Ec8C13B26ed6f41d4729Eb27D7Fd"
const TICKET_SHOP_FACTORY_ADDRESS = process.env.TICKET_SHOP_FACTORY_ADDRESS
const JPYC_ADDRESS = process.env.JPYC_ADDRESS

if (!JPYC_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function(hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet()
  const provider = getProvider()

  const ticketShopFactoryContractArtifact = await hre.artifacts.readArtifact(
    "TicketShopFactory",
  )

  const ticketShopFactory: TicketShopFactory = new ethers.Contract(
    TICKET_SHOP_FACTORY_ADDRESS!,
    ticketShopFactoryContractArtifact.abi,
    getWallet(),
  ) as any

  const ticketShopAddress = (await ticketShopFactory.getTicketShops())[0]

  const ticketShopContractArtifact = await hre.artifacts.readArtifact(
    "TicketShop",
  )

  console.log(`using ticket shop ${ticketShopAddress}`)

  const ticketShop: TicketShop = new ethers.Contract(
    ticketShopAddress,
    ticketShopContractArtifact.abi,
    getWallet(),
  ) as any

  const usdtContractArtifact = await hre.artifacts.readArtifact(
    "JPYC",
  )

  const jpyc: JPYC = new ethers.Contract(
    JPYC_ADDRESS!,
    usdtContractArtifact.abi,
    getWallet(),
  ) as any

  const userBalance_eth_before = await provider.getBalance(wallet.address)
  const userBalance_jpyc_before = await jpyc.balanceOf(wallet.address)

  console.log(`wallet address ${wallet.address}`)
  console.log(`ETH  balance = ${userBalance_eth_before}`)
  console.log(`JPYC balance = ${userBalance_jpyc_before}`)

  const shopPaymasterAddress = await ticketShop.getShopPaymasterAddress()
  const shopPaymasterBalance_before = await provider.getBalance(shopPaymasterAddress)
  console.log(`Paymaster ETH balance = ${formatEther(shopPaymasterBalance_before)}`)

  const paymasterParams = utils.getPaymasterParams(
    shopPaymasterAddress,
    {
      type: "ApprovalBased",
      token: JPYC_ADDRESS!,
      minimalAllowance: BigInt(1),
      innerInput: new Uint8Array(),
    },
  )

  await (
    await jpyc.approve(
      TICKET_SHOP_ADDRESS,
      BigInt(1_000),
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      },
    )
  ).wait()

  await (
    await ticketShop.buyTicket(
      BigInt(0),
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      },
    )
  ).wait()

  console.log("Ticket purchase done")

  const userBalance_eth_after = await provider.getBalance(wallet.address)
  const userBalance_jpyc_after = await jpyc.balanceOf(wallet.address)

  console.log(`wallet address ${wallet.address}`)
  console.log(`ETH  balance = ${userBalance_eth_after}`)
  console.log(`JPYC balance = ${userBalance_jpyc_after}`)

  const shopPaymasterBalance_after = await provider.getBalance(shopPaymasterAddress)
  console.log(`Paymaster ETH balance = ${formatEther(shopPaymasterBalance_after)}`)
}
