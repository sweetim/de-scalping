import {
  ethers,
  formatEther,
} from "ethers"
import * as hre from "hardhat"
import { v4 as uuidv4 } from "uuid"
import {
  TicketShop,
  TicketShopFactory,
} from "../typechain-types"
import { TicketSchema } from "../typechain-types/contracts/TicketShop"
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

  const id = uuidv4()

  const ticketMetadata: TicketSchema.MetadataStruct = {
    id,
    name: "Coldplay Concert Tokyo 2023",
    description:
      "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
    uri:
      "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",

    location: {
      name: "Tokyo Dome, Japan",
      uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
    },
    dates: [
      (new Date("2023-06-20")).getTime(),
      (new Date("2023-06-22")).getTime(),
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

  const ticketIndex = (await ticketShopFactory.getTicketShops()).length

  await (
    await ticketShopFactory.createTicketShop(
      ticketMetadata,
      JPYC_ADDRESS!,
    )
  ).wait()

  const ticketShopAddress = (await ticketShopFactory.getTicketShops())[ticketIndex]

  console.log(`created ticket shop (${ticketShopAddress})`)

  const ticketShopContractArtifact = await hre.artifacts.readArtifact(
    "TicketShop",
  )

  const ticketShop: TicketShop = new ethers.Contract(
    ticketShopAddress,
    ticketShopContractArtifact.abi,
    getWallet(),
  ) as any

  const shopPaymasterAddress = await ticketShop.getShopPaymasterAddress()

  const wallet = getWallet()

  await (
    await wallet.sendTransaction({
      to: shopPaymasterAddress,
      value: ethers.parseEther("0.005"),
    })
  ).wait()

  const provider = getProvider()
  const paymasterBalance = await provider.getBalance(shopPaymasterAddress)
  console.log(`paymaster address (${shopPaymasterAddress})`)
  console.log(`Paymaster ETH balance is now ${formatEther(paymasterBalance)}`)
}
