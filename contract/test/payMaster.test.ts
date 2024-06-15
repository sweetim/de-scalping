import { expect } from "chai"
import { formatEther } from "ethers"
import { ethers } from "hardhat"
import { v4 as uuidv4 } from "uuid"
import { utils } from "zksync-ethers"
import {
  deployContract,
  getProvider,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import {
  ShopPaymaster,
  TicketERC20,
  TicketNFT,
  TicketShop,
} from "../typechain-types"

describe("PayMaster", function() {
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
    const INITIAL_ERC_20_AMOUNT = 100

    const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
    const user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
    const user_2 = getWallet(LOCAL_RICH_WALLETS[2].privateKey)

    const ticketErc20: TicketERC20 = await deployContract(
      "TicketERC20",
      [],
      { wallet: owner, silent: true },
    ) as any

    const ticketErc20Address = await ticketErc20.getAddress()

    const ticketShop: TicketShop = await deployContract(
      "TicketShop",
      [],
      { wallet: owner, silent: true },
    ) as any
    const ticketShopAddress = await ticketShop.getAddress()

    const shopPaymaster: ShopPaymaster = await deployContract(
      "ShopPaymaster",
      [
        ticketErc20Address,
        ticketShopAddress,
      ],
      { wallet: owner, silent: true },
    ) as any
    const shopPaymasterAddress = await shopPaymaster.getAddress()

    const ticketNft: TicketNFT = await deployContract(
      "TicketNFT",
      [
        "Ticket",
        "TKT",
      ],
      { wallet: owner, silent: true },
    ) as any
    const ticketNftAddress = await ticketNft.getAddress()

    await (await ticketErc20.mint(user_1.address, INITIAL_ERC_20_AMOUNT)).wait()

    return {
      ticketErc20,
      ticketErc20Address,
      shopPaymaster,
      shopPaymasterAddress,
      ticketNft,
      ticketNftAddress,
      ticketShop,
      ticketShopAddress,
      owner,
      user_1,
      user_2,
    }
  }

  it("should able to sponsor transaction for ticket shop", async function() {
    const {
      owner,
      user_1,
      ticketErc20,
      ticketErc20Address,
      ticketShop,
      shopPaymaster,
      shopPaymasterAddress,
    } = await deployTicketShop()

    const PAY_MASTER_INITIAL_FUND = 1

    await (
      await owner.sendTransaction({
        to: shopPaymasterAddress,
        value: ethers.parseEther(`${PAY_MASTER_INITIAL_FUND}`),
      })
    ).wait()

    const provider = getProvider()
    const shopPaymasterBeforeBalance = await provider.getBalance(shopPaymasterAddress)

    const ethBalance_user1_before = await user_1.getBalance()
    const erc20Balance_user1_before = await ticketErc20.balanceOf(user_1.address)

    expect(Number(formatEther(shopPaymasterBeforeBalance))).to.be.eq(PAY_MASTER_INITIAL_FUND)

    const paymasterParams = utils.getPaymasterParams(
      shopPaymasterAddress,
      {
        type: "ApprovalBased",
        token: ticketErc20Address,
        minimalAllowance: BigInt("5"),
        innerInput: new Uint8Array(),
      },
    )

    await (await ticketShop.connect(user_1).createNewCollection(
      id,
      TICKET_METADATA,
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paymasterParams,
        },
      },
    )).wait()

    const shopPaymasterAfterBalance = await provider.getBalance(shopPaymasterAddress)
    expect(shopPaymasterBeforeBalance - shopPaymasterAfterBalance)
      .to.be.gt(0)

    const ethBalance_user1_after = await user_1.getBalance()
    expect(ethBalance_user1_before - ethBalance_user1_after).to.be.eq(0)

    const erc20Balance_user1_after = await ticketErc20.balanceOf(user_1.address)
    expect(erc20Balance_user1_before - erc20Balance_user1_after).to.be.gt(0)
  })

  it("should not able to sponsor transaction besides ticket shop", async function() {
    const {
      owner,
      user_1,
      ticketErc20,
      ticketErc20Address,
      ticketShop,
      ticketShopAddress,
      ticketNft,
      shopPaymaster,
      shopPaymasterAddress,
      user_2,
    } = await deployTicketShop()

    const PAY_MASTER_INITIAL_FUND = 1

    await (
      await owner.sendTransaction({
        to: shopPaymasterAddress,
        value: ethers.parseEther(`${PAY_MASTER_INITIAL_FUND}`),
      })
    ).wait()

    const provider = getProvider()
    const ethBalance_shopPayMaster_before = await provider.getBalance(shopPaymasterAddress)

    const ethBalance_user1_before = await user_1.getBalance()
    const erc20Balance_user1_before = await ticketErc20.balanceOf(user_1.address)

    expect(Number(formatEther(ethBalance_shopPayMaster_before))).to.be.eq(PAY_MASTER_INITIAL_FUND)

    const paymasterParams = utils.getPaymasterParams(
      shopPaymasterAddress,
      {
        type: "ApprovalBased",
        token: ticketErc20Address,
        minimalAllowance: BigInt("5"),
        innerInput: new Uint8Array(),
      },
    )

    try {
      await (await ticketErc20.connect(user_1).mint(
        user_2.address,
        BigInt(100),
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        },
      )).wait()
    } catch (e) {
      expect(e.message).to.include("execution reverted (no data present; likely require(false)")
    }

    const ethBalance_shopPayMaster_after = await provider.getBalance(shopPaymasterAddress)
    expect(ethBalance_shopPayMaster_before - ethBalance_shopPayMaster_after)
      .to.be.eq(0)

    const ethBalance_user1_after = await user_1.getBalance()
    expect(ethBalance_user1_before - ethBalance_user1_after).to.be.eq(0)

    const erc20Balance_user1_after = await ticketErc20.balanceOf(user_1.address)
    expect(erc20Balance_user1_before - erc20Balance_user1_after).to.be.eq(0)
  })
})
