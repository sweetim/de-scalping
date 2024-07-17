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

    const ticketSold_before = Number(
      ticketMetadata.pricing[ticketTypeIndex].soldTickets,
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

    const ticketSold_after = Number(
      convertToStruct(
        await ticketShop.getTicketMetadata(),
      ).pricing[ticketTypeIndex].soldTickets,
    )

    const balance_after = await user_1.getBalance()
    const jpycBalance_after = await jpyc.balanceOf(user_1.address)
    const gasUsed = balance_before - balance_after

    expect(gasUsed).to.be.gt(0)
    expect(jpycBalance_before - jpycBalance_after).to.be.eq(ticketPrice)
    expect(ticketSold_after - ticketSold_before).to.be.eq(1)
    expect(await ticketNft.balanceOf(user_1)).to.be.eq(1)
  })

  it("should not allow same user to buy ticket again", async function() {
    const ticketTypeIndex = 0
    const ticketMetadata = convertToStruct(
      await ticketShop.getTicketMetadata(),
    )

    const ticketSold_before = Number(
      ticketMetadata.pricing[ticketTypeIndex].soldTickets,
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

    const ticketSold_after = Number(
      convertToStruct(
        await ticketShop.getTicketMetadata(),
      ).pricing[ticketTypeIndex].soldTickets,
    )

    const balance_after = await user_1.getBalance()
    const jpycBalance_after = await jpyc.balanceOf(user_1.address)
    const gasUsed = balance_before - balance_after

    expect(gasUsed).to.be.gt(0)
    expect(jpycBalance_before - jpycBalance_after).to.be.eq(0)
    expect(ticketSold_before - ticketSold_after).to.be.eq(0)
    expect(await ticketNft.balanceOf(user_1)).to.be.eq(1)
  })

  it("should not able to buy ticket when sold out", async function() {
    const ticketTypeIndex = 0
    const ticketMetadata = convertToStruct(
      await ticketShop.getTicketMetadata(),
    )

    const ticketSold_before = Number(
      ticketMetadata.pricing[ticketTypeIndex].soldTickets,
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

    const ticketSold_after = Number(
      convertToStruct(
        await ticketShop.getTicketMetadata(),
      ).pricing[ticketTypeIndex].soldTickets,
    )

    const balance_after = await user_2.getBalance()
    const jpycBalance_after = await jpyc.balanceOf(user_2.address)
    const gasUsed = balance_before - balance_after

    expect(gasUsed).to.be.gt(0)
    expect(jpycBalance_before - jpycBalance_after).to.be.eq(0)
    expect(ticketSold_before - ticketSold_after).to.be.eq(0)
  })

  it("should able to get parse nft tokenURI to json object", async () => {
    const expected = {
      name: "Coldplay Concert Tokyo 2023",
      description:
        "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
      image:
        "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",
      attributes: [
        {
          display_type: "date",
          trait_type: "Start date",
          value: 1675987200,
        },
        { display_type: "date", trait_type: "End date", value: 1676246400 },
        { trait_type: "Location name", value: "Tokyo Dome, Japan" },
        {
          trait_type: "Location uri",
          value: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
        },
        { trait_type: "Ticket type", value: "Gold" },
        {
          trait_type: "Ticket description",
          value: "exclusive merchandise and a dedicated entrance",
        },
        { trait_type: "Ticket price", value: 500 },
        { trait_type: "Ticket ID", value: 0 },
      ],
    }

    const tokenUriText = await ticketNft.tokenURI(BigInt(1))
    const actual = JSON.parse(
      Buffer
        .from(tokenUriText.substring(29), "base64")
        .toString(),
    )

    expect(actual).to.be.deep.eq(expected)
  })
})
