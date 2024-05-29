import { ethers } from "ethers"
import {
  ShopPaymaster,
  TicketERC20,
  TicketShop,
} from "../typechain-types"
import {
  deployContract,
  getProvider,
  getWallet,
} from "./utils"

export default async function() {
  const ticketErc20: TicketERC20 = await deployContract(
    "TicketERC20",
    [],
  ) as any

  const ticketErc20Address = await ticketErc20.getAddress()

  const shopPaymaster: ShopPaymaster = await deployContract(
    "ShopPaymaster",
    [ ticketErc20Address ],
  ) as any
  const shopPaymasterAddress = await shopPaymaster.getAddress()

  const ticketShop: TicketShop = await deployContract(
    "TicketShop",
    [],
  ) as any
  const ticketShopAddress = await ticketShop.getAddress()

  const wallet = getWallet()

  await (
    await wallet.sendTransaction({
      to: shopPaymasterAddress,
      value: ethers.parseEther("0.01"),
    })
  ).wait()

  const provider = getProvider()
  const paymasterBalance = await provider.getBalance(shopPaymasterAddress)
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`)

  console.table({
    ticketErc20Address,
    shopPaymasterAddress,
    ticketShopAddress,
  })
}
