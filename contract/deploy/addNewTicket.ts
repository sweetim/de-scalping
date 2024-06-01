import { ethers } from "ethers"
import * as hre from "hardhat"
import { v4 as uuidv4 } from "uuid"
import { TicketShop } from "../typechain-types"
import { getWallet } from "./utils"

const CONTRACT_ADDRESS = "0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B"
if (!CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function() {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`)

  const contractArtifact = await hre.artifacts.readArtifact(
    "TicketShop",
  )

  const contract: TicketShop = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet(),
  ) as any

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

  await contract.createNewCollection(id, ticketMetadata)
  console.log(`added new ticket collection (${id})`)
  const item = await contract.getTicketMetadata(id)
  console.log(item)
}
