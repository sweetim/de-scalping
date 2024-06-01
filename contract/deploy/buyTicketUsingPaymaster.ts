import * as ethers from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { v4 as uuidv4 } from "uuid"
import { utils } from "zksync-ethers"
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
export default async function(hre: HardhatRuntimeEnvironment) {
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
      value: ethers.parseEther("0.06"),
    })
  ).wait()

  const provider = getProvider()
  const shopPaymasterBalance = await provider.getBalance(shopPaymasterAddress)
  console.log(`Paymaster ETH balance is now ${shopPaymasterBalance.toString()}`)

  await (await ticketErc20.mint(wallet.address, 100)).wait()
  const id = uuidv4()
  const ticketMetadata: TicketShop.TicketMetadataStruct = {
    id,
    title: "Coldplay Concert Tokyo 2023",
    description:
      "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
    uri:
      "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",

    location: {
      name: "Tokyo Dome, Japan",
      uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
    },
    dates: [
      "2023-06-20",
      "2023-06-22",
    ],
    pricing: [
      {
        name: "Gold",
        description: "exclusive merchandise and a dedicated entrance",
        price: 500,
        tickets: 50,
      },
      {
        name: "Balcony",
        description: "secure your spot for a great view of the stage",
        price: 250,
        tickets: 200,
      },
      {
        name: "S",
        description: "this section offers a fantastic view of the performance",
        price: 200,
        tickets: 1000,
      },
      {
        name: "A",
        description: "affordable option provides a great concert experience",
        price: 160,
        tickets: 5000,
      },
    ],
  }
  await (await ticketShop.createNewCollection(id, ticketMetadata)).wait()

  const paymasterParams = utils.getPaymasterParams(shopPaymasterAddress, {
    type: "ApprovalBased",
    token: ticketErc20Address,
    minimalAllowance: BigInt("5"),
    innerInput: new Uint8Array(),
  })

  const gasLimit = await ticketShop.buyTicket.estimateGas(
    id,
    BigInt(0),
    {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    },
  )

  console.log(gasLimit)

  await (
    await ticketShop.buyTicket(
      id,
      BigInt(0),
      {
        // paymaster info
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      },
    )
  ).wait()

  console.log(`user ${await ticketErc20.balanceOf(wallet.address)}`)
  console.log(`Paymaster ERC20 token balance is now ${await ticketErc20.balanceOf(shopPaymasterAddress)}`)
  console.log(await provider.getBalance(shopPaymasterAddress))
}
