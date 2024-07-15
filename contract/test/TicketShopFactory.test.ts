import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import * as hre from "hardhat"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import {
  JPYC,
  TicketShop,
  TicketShopFactory,
} from "../typechain-types"
import { TICKET_METADATA } from "./common"

describe("TicketShopFactory", function() {
  async function deployTicketShopFactory() {
    const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
    const user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)

    const jpyc: JPYC = await deployContract(
      "JPYC",
      [],
      {
        wallet: owner,
        silent: true,
      },
    ) as any
    const jpycAddress = await jpyc.getAddress()

    const ticketShopFactory: TicketShopFactory = await deployContract(
      "TicketShopFactory",
      [],
      {
        wallet: owner,
        silent: true,
      },
    ) as any
    const ticketShopFactoryAddress = await ticketShopFactory.getAddress()

    return {
      ticketShopFactory,
      ticketShopFactoryAddress,
      jpyc,
      jpycAddress,
      owner,
      user_1,
    }
  }

  it("should able to create ticket shop", async function() {
    const {
      ticketShopFactory,
      jpycAddress,
      user_1,
      owner,
    } = await deployTicketShopFactory()

    await expect(
      ticketShopFactory.createTicketShop(
        TICKET_METADATA("1"),
        jpycAddress,
      ),
    ).to.emit(ticketShopFactory, "TicketShopCreated")
      .withArgs(owner.address, anyValue)

    await expect(
      ticketShopFactory.createTicketShop(
        TICKET_METADATA("2"),
        jpycAddress,
      ),
    ).to.emit(ticketShopFactory, "TicketShopCreated")
      .withArgs(owner.address, anyValue)

    const ticketShops = await ticketShopFactory.getTicketShops()

    expect(ticketShops.length).to.be.gt(1)

    const [ id_1, id_2 ] = await Promise.all(
      ticketShops.map(async (address, i) => {
        const ticketShop: TicketShop = await hre.zksyncEthers.getContractAt(
          "TicketShop",
          address,
        ) as any

        return (await ticketShop.getTicketMetadata()).id
      }),
    )

    expect(id_1).to.be.eq("1")
    expect(id_2).to.be.eq("2")
  })
})
