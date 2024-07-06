import { expect } from "chai"
import { Wallet } from "zksync-ethers"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import { TicketNFT } from "../typechain-types"

describe("TicketNFT", function() {
  let ticketNFT: TicketNFT
  let owner: Wallet
  let user_1: Wallet
  let user_2: Wallet
  let ticketUri: any

  before(async () => {
    owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
    user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
    user_2 = getWallet(LOCAL_RICH_WALLETS[2].privateKey)

    ticketNFT = await deployContract(
      "TicketNFT",
      [
        "ColdPlay",
        "CP",
      ],
      { wallet: owner, silent: true },
    ) as any

    ticketUri = {
      "description":
        "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
      "external_url": "https://de-scalping.vercel.app/ticket/f2bb8c25-7964-4d83-8fab-25866019fabc",
      "image":
        "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",
      "name": "1",
      "attributes": [
        {
          "trait_type": "Type",
          "value": "Gold",
        },
        {
          "display_type": "date",
          "trait_type": "Date",
          "value": 1546360800,
        },
      ],
    }
  })

  it("should able to mint by owner", async function() {
    await (await ticketNFT.mint(
      owner.address,
      JSON.stringify(ticketUri),
    )).wait()

    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(1))
  })

  it("should not able to register burner by non owner", async function() {
    expect((await ticketNFT.getAllBurner()).length).to.be.eq(1)

    try {
      await (
        await ticketNFT.connect(user_1).registerBurner(user_1.address)
      ).wait()
    } catch (e) {
      expect(e.message).to.include("Ownable: caller is not the owner")
    }

    expect((await ticketNFT.getAllBurner()).length).to.be.eq(1)

    try {
      await (
        await ticketNFT.connect(user_2).registerBurner(user_1.address)
      ).wait()
    } catch (e) {
      expect(e.message).to.include("Ownable: caller is not the owner")
    }

    expect((await ticketNFT.getAllBurner()).length).to.be.eq(1)
  })

  it("should only allow owner to register burner", async function() {
    expect((await ticketNFT.getAllBurner()).length).to.be.eq(1)

    await (await ticketNFT.registerBurner(user_1.address)).wait()

    const allBurner = await ticketNFT.getAllBurner()
    expect(allBurner.length).to.be.eq(2)
    expect(allBurner[0]).to.be.eq(owner.address)
    expect(allBurner[1]).to.be.eq(user_1.address)
  })

  it("should have correct token uri", async function() {
    const tokenId = 1
    const tokenUri = await ticketNFT.tokenURI(tokenId)

    expect(JSON.parse(tokenUri)).to.be.deep.eq(ticketUri)
  })

  it("should not allow burnable role to mint", async function() {
    try {
      await (
        await ticketNFT.connect(user_1)
          .mint(user_1.address, JSON.stringify(ticketUri))
      ).wait()
    } catch (e) {
      expect(e.message).to.include("Ownable: caller is not the owner")
    }
  })

  it("should not allow non owner to mint", async function() {
    try {
      await (
        await ticketNFT.connect(user_2)
          .mint(user_1.address, JSON.stringify(ticketUri))
      ).wait()
    } catch (e) {
      expect(e.message).to.include("Ownable: caller is not the owner")
    }
  })

  it("should be soul bound and not able to transfer to other user", async () => {
    const tokenId = 1
    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(1))
    expect(await ticketNFT.balanceOf(user_1.address)).to.be.eq(BigInt(0))

    try {
      await (
        await ticketNFT.transferFrom(owner.address, user_1.address, 1)
      ).wait()
    } catch (e) {
      expect(e.message).to.include("Token not transferable")
    }

    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(1))
    expect(await ticketNFT.balanceOf(user_1.address)).to.be.eq(BigInt(0))
  })

  it("should not be able to burn by non owner and non burner role", async () => {
    const tokenId = 1
    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(1))
    expect(await ticketNFT.balanceOf(user_1.address)).to.be.eq(BigInt(0))

    try {
      await (
        await ticketNFT.connect(user_2).burn(1)
      ).wait()
    } catch (e) {
      expect(e.message).to.include("ERC721Burnable: caller is not owner nor approved")
    }

    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(1))
    expect(await ticketNFT.balanceOf(user_1.address)).to.be.eq(BigInt(0))
  })

  it("should be able to burn by owner", async () => {
    const tokenId = 1
    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(1))
    expect(await ticketNFT.balanceOf(user_1.address)).to.be.eq(BigInt(0))

    await (
      await ticketNFT.burn(1)
    ).wait()

    expect(await ticketNFT.balanceOf(owner.address)).to.be.eq(BigInt(0))
    expect(await ticketNFT.balanceOf(user_1.address)).to.be.eq(BigInt(0))
  })

  it("should be able to burn by burner role", async () => {
    const tokenId = 2

    expect(await ticketNFT.balanceOf(user_2.address)).to.be.eq(BigInt(0))

    await (await ticketNFT.mint(
      user_2.address,
      JSON.stringify(ticketUri),
    )).wait()

    expect(await ticketNFT.balanceOf(user_2.address)).to.be.eq(BigInt(1))

    await (
      await ticketNFT.connect(user_1).burn(tokenId)
    ).wait()

    expect(await ticketNFT.balanceOf(user_2.address)).to.be.eq(BigInt(0))
  })
})
