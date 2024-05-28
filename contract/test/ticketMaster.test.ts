import { expect } from "chai"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import { TicketCollection } from "../typechain-types"
import { v4 as uuidv4 } from "uuid"

describe("TicketCollection", function() {
  let ticketCollection: TicketCollection

  it("should able to create new ticket collection", async function() {
    const wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey)

    ticketCollection = await deployContract(
      "TicketCollection",
      [],
      { wallet, silent: true },
    ) as any

    const ticketMetadata: TicketCollection.TicketMetadataStruct = {
      title: "Coldplay Concert Tokyo 2023",
      description:
        "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
      uri:
        "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",
      location: {
        name: "Tokyo Dome, Japan",
        uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
      },
      pricing: [
        {
          name: "Gold",
          description: "exclusive merchandise and a dedicated entrance",
          price: 500,
          tickets: 100,
        },
        {
          name: "Balcony",
          description: "secure your spot for a great view of the stage",
          price: 250,
          tickets: 100,
        },
        {
          name: "S",
          description: "this section offers a fantastic view of the performance",
          price: 200,
          tickets: 100,
        },
        {
          name: "A",
          description: "affordable option provides a great concert experience",
          price: 160,
          tickets: 100,
        },
      ],
    }

    const id = uuidv4()
    await ticketCollection.createNewCollection(id, ticketMetadata)

    const actual = await ticketCollection.getTicketMetadata(id)
    expect(actual).to.not.empty
  })
})
