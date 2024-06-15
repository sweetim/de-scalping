import { expect } from "chai"
import { v4 as uuidv4 } from "uuid"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import { TicketShop } from "../typechain-types"

describe("TicketShop", function() {
  const id = uuidv4()
  const TICKET_METADATA: TicketShop.TicketMetadataStruct = {
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
      "2023-02-10",
      "2023-02-13",
    ],
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

  async function deployTicketShop() {
    const wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey)

    const ticketShop: TicketShop = await deployContract(
      "TicketShop",
      [],
      { wallet, silent: true },
    ) as any

    return {
      ticketShop,
      wallet,
    }
  }

  it("should able to create new ticket collection", async function() {
    const { ticketShop } = await deployTicketShop()

    const id = uuidv4()
    await ticketShop.createNewCollection(id, TICKET_METADATA)
    const actual = await ticketShop.getTicketMetadata(id)
    expect(actual).to.not.empty
  })

  it("should able to buy ticket", async function() {
    const { ticketShop, wallet } = await deployTicketShop()

    const ticketId = 1
    const id = uuidv4()
    await ticketShop.createNewCollection(id, TICKET_METADATA)

    const beforeBalance = await wallet.getBalance()

    const actualBefore = await ticketShop.getTicketMetadata(id)
    expect(actualBefore[6][ticketId][3])
      .to.be.eq(Number(TICKET_METADATA.pricing[ticketId].tickets))

    await ticketShop.buyTicket(id, ticketId)

    const actualAfter = await ticketShop.getTicketMetadata(id)
    expect(actualAfter[6][ticketId][3])
      .to.be.eq(Number(TICKET_METADATA.pricing[ticketId].tickets) - 1)

    const afterBalance = await wallet.getBalance()

    expect(beforeBalance - afterBalance).to.be.gt(0)
  })
})
