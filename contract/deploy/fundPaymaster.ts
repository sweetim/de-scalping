import {
  ethers,
  formatEther,
} from "ethers"
import * as hre from "hardhat"
import {
  TicketShop,
  TicketShopFactory,
} from "../typechain-types"
import {
  getProvider,
  getWallet,
} from "./utils"

const TICKET_SHOP_FACTORY_ADDRESS = process.env.TICKET_SHOP_FACTORY_ADDRESS
const JPYC_ADDRESS = process.env.JPYC_ADDRESS

if (!TICKET_SHOP_FACTORY_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"
if (!JPYC_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function() {
  console.log(`Running script to interact with contract ${TICKET_SHOP_FACTORY_ADDRESS}`)

  const ticketShopFactoryContractArtifact = await hre.artifacts.readArtifact(
    "TicketShopFactory",
  )

  const ticketShopFactory: TicketShopFactory = new ethers.Contract(
    TICKET_SHOP_FACTORY_ADDRESS!,
    ticketShopFactoryContractArtifact.abi,
    getWallet(),
  ) as any

  const ticketShopAddress = (await ticketShopFactory.getTicketShops())[0]

  console.log(`ticket shop (${ticketShopAddress})`)

  const ticketShopContractArtifact = await hre.artifacts.readArtifact(
    "TicketShop",
  )

  const ticketShop: TicketShop = new ethers.Contract(
    ticketShopAddress,
    ticketShopContractArtifact.abi,
    getWallet(),
  ) as any

  const shopPaymasterAddress = await ticketShop.getShopPaymasterAddress()

  const provider = getProvider()
  const paymasterBalanceBefore = await provider.getBalance(shopPaymasterAddress)
  console.log(`paymaster address (${shopPaymasterAddress})`)
  console.log(`before Paymaster ETH balance is ${formatEther(paymasterBalanceBefore)}`)

  const wallet = getWallet()

  await (
    await wallet.sendTransaction({
      to: shopPaymasterAddress,
      value: ethers.parseEther("1.0"),
    })
  ).wait()

  const paymasterBalanceAfter = await provider.getBalance(shopPaymasterAddress)
  console.log(`after paymaster ETH balance is ${formatEther(paymasterBalanceAfter)}`)
}
