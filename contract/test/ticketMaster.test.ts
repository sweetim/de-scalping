import { expect } from 'chai';
import { getWallet, deployContract, LOCAL_RICH_WALLETS } from '../deploy/utils';
import { TicketMaster } from "../typechain-types"
import { v4 as uuidv4 } from 'uuid';


describe('TicketMaster', function () {
  let ticketMaster: TicketMaster

  it("should able to create new ticket", async function () {
    const wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);

    ticketMaster = await deployContract(
      "TicketMaster",
      [],
      { wallet, silent: true }) as any;

    const ticketMetadata: TicketMaster.TicketMetadataStruct = {
      title: "Coldplay Concert Tokyo 2023",
      description: "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
      uri: "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",
      availableTickets: 1326,
      location: {
        name: "Tokyo Dome, Japan",
        uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7"
      },
      pricing_1: {
        name: "Gold",
        description: "exclusive merchandise and a dedicated entrance",
        amount: 500
      },
      pricing_2: {
        name: "Balcony",
        description: "secure your spot for a great view of the stage",
        amount: 250
      },
      pricing_3: {
        name: "S",
        description: "this section offers a fantastic view of the performance",
        amount: 200
      },
      pricing_4: {
        name: "A",
        description: "affordable option provides a great concert experience",
        amount: 160
      }
    }

    const id = uuidv4()
    await ticketMaster.createNewTicket(id, ticketMetadata)

    const actual = await ticketMaster.getTicketMetadata(id)

    expect(actual).to.deep.eq(ticketMetadata)
  })
});

