import { expect } from "chai"
import * as hre from "hardhat"
import { Wallet } from "zksync-ethers"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import {
  JPYC,
  TicketNFT,
  TicketShop,
} from "../typechain-types"
import {
  convertToStruct,
  TICKET_METADATA,
} from "./common"

describe("TicketShop", function() {
  const MINT_AMOUNT = BigInt(100_000)
  const ticketMetadata = TICKET_METADATA()
  let owner: Wallet
  let user_1: Wallet
  let user_2: Wallet
  let jpyc: JPYC
  let jpycAddress: string
  let ticketShop: TicketShop
  let ticketShopAddress: string
  let ticketNft: TicketNFT
  let ticketNftAddress: string

  before(async () => {
    owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
    user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
    user_2 = getWallet(LOCAL_RICH_WALLETS[2].privateKey)

    jpyc = await deployContract(
      "JPYC",
      [],
      {
        wallet: owner,
        silent: true,
      },
    ) as any
    jpycAddress = await jpyc.getAddress()

    ticketShop = await deployContract(
      "TicketShop",
      [
        ticketMetadata,
        jpycAddress,
      ],
      {
        wallet: owner,
        silent: true,
      },
    ) as any
    ticketShopAddress = await ticketShop.getAddress()
    ticketNftAddress = await ticketShop.getNftAddress()

    ticketNft = await hre.zksyncEthers.getContractAt(
      "TicketNFT",
      ticketNftAddress,
    ) as any

    await (
      await jpyc.mint(user_1.address, MINT_AMOUNT)
    ).wait()
  })

  it("should able to get ticket metadata", async function() {
    const actual = await ticketShop.getTicketMetadata()
    expect(convertToStruct(actual)).deep.eq(ticketMetadata)
  })

  it("should able to buy ticket with own gas", async function() {
    const ticketTypeIndex = 0
    const ticketMetadata = convertToStruct(
      await ticketShop.getTicketMetadata(),
    )

    const ticketCount_before = Number(
      ticketMetadata.pricing[ticketTypeIndex].tickets,
    )
    const ticketPrice = Number(
      ticketMetadata.pricing[ticketTypeIndex].price,
    )

    const balance_before = await user_1.getBalance()
    const jpycBalance_before = await jpyc.balanceOf(user_1.address)

    expect(await ticketNft.balanceOf(user_1)).to.be.eq(0)

    await (
      await jpyc
        .connect(user_1)
        .approve(ticketShopAddress, ticketPrice)
    ).wait()

    await (
      await ticketShop
        .connect(user_1)
        .buyTicket(ticketTypeIndex)
    ).wait()

    const ticketCount_after = Number(
      convertToStruct(
        await ticketShop.getTicketMetadata(),
      ).pricing[ticketTypeIndex].tickets,
    )

    const balance_after = await user_1.getBalance()
    const jpycBalance_after = await jpyc.balanceOf(user_1.address)
    const gasUsed = balance_before - balance_after

    expect(gasUsed).to.be.gt(0)
    expect(jpycBalance_before - jpycBalance_after).to.be.eq(ticketPrice)
    expect(ticketCount_before - ticketCount_after).to.be.eq(1)
    expect(await ticketNft.balanceOf(user_1)).to.be.eq(1)
  })

  it("should not allow same user to buy ticket again", async function() {
    const ticketTypeIndex = 0
    const ticketMetadata = convertToStruct(
      await ticketShop.getTicketMetadata(),
    )

    const ticketCount_before = Number(
      ticketMetadata.pricing[ticketTypeIndex].tickets,
    )
    const ticketPrice = Number(
      ticketMetadata.pricing[ticketTypeIndex].price,
    )

    const balance_before = await user_1.getBalance()
    const jpycBalance_before = await jpyc.balanceOf(user_1.address)

    expect(await ticketNft.balanceOf(user_1)).to.be.eq(1)

    await (
      await jpyc
        .connect(user_1)
        .approve(ticketShopAddress, ticketPrice)
    ).wait()

    try {
      await (
        await ticketShop
          .connect(user_1)
          .buyTicket(ticketTypeIndex)
      ).wait()
    } catch (err) {
      expect(err.message).to.include("only allow to purchase 1 ticket")
    }

    const ticketCount_after = Number(
      convertToStruct(
        await ticketShop.getTicketMetadata(),
      ).pricing[ticketTypeIndex].tickets,
    )

    const balance_after = await user_1.getBalance()
    const jpycBalance_after = await jpyc.balanceOf(user_1.address)
    const gasUsed = balance_before - balance_after

    expect(gasUsed).to.be.gt(0)
    expect(jpycBalance_before - jpycBalance_after).to.be.eq(0)
    expect(ticketCount_before - ticketCount_after).to.be.eq(0)
    expect(await ticketNft.balanceOf(user_1)).to.be.eq(1)
  })

  it("should not able to buy ticket when sold out", async function() {
    const ticketTypeIndex = 0
    const ticketMetadata = convertToStruct(
      await ticketShop.getTicketMetadata(),
    )

    const ticketCount_before = Number(
      ticketMetadata.pricing[ticketTypeIndex].tickets,
    )
    const ticketPrice = Number(
      ticketMetadata.pricing[ticketTypeIndex].price,
    )

    const balance_before = await user_2.getBalance()
    const jpycBalance_before = await jpyc.balanceOf(user_2.address)

    await (
      await jpyc
        .connect(user_2)
        .approve(ticketShopAddress, ticketPrice)
    ).wait()

    try {
      await (
        await ticketShop
          .connect(user_2)
          .buyTicket(ticketTypeIndex)
      ).wait()
    } catch (err) {
      expect(err.message).to.include("tickets sold out")
    }

    const ticketCount_after = Number(
      convertToStruct(
        await ticketShop.getTicketMetadata(),
      ).pricing[ticketTypeIndex].tickets,
    )

    const balance_after = await user_2.getBalance()
    const jpycBalance_after = await jpyc.balanceOf(user_2.address)
    const gasUsed = balance_before - balance_after

    expect(gasUsed).to.be.gt(0)
    expect(jpycBalance_before - jpycBalance_after).to.be.eq(0)
    expect(ticketCount_before - ticketCount_after).to.be.eq(0)
  })
})
