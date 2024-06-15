import { expect } from "chai"
import { ethers } from "ethers"
import * as hre from "hardhat"
import { utils } from "zksync-ethers"
import {
  deployContract,
  getProvider,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import {
  JPYC,
  ShopPaymaster,
  TicketShop,
  TicketShopFactory,
} from "../typechain-types"
import {
  convertToStruct,
  TICKET_METADATA,
} from "./common"

describe("ShopPaymaster", function() {
  const INITIAL_ERC_20_AMOUNT = 100_000

  async function deployTicketShop() {
    const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
    const user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
    const user_2 = getWallet(LOCAL_RICH_WALLETS[2].privateKey)

    const jpyc: JPYC = await deployContract(
      "JPYC",
      [],
      { wallet: owner, silent: true },
    ) as any
    const jpycAddress = await jpyc.getAddress()

    const ticketShopFactory: TicketShopFactory = await deployContract(
      "TicketShopFactory",
      [],
      { wallet: owner, silent: false },
    ) as any
    const ticketShopFactoryAddress = await ticketShopFactory.getAddress()

    await (await jpyc.mint(user_1.address, INITIAL_ERC_20_AMOUNT)).wait()

    await (
      await ticketShopFactory.createTicketShop(
        TICKET_METADATA(),
        jpycAddress,
      )
    ).wait()

    const ticketShopAddress = (await ticketShopFactory.getTicketShops())[0]
    const ticketShop: TicketShop = await hre.zksyncEthers.getContractAt(
      "TicketShop",
      ticketShopAddress,
    ) as any

    const ticketShopPaymasterAddress = await ticketShop.getShopPaymasterAddress()
    const ticketShopPaymaster: ShopPaymaster = await hre.zksyncEthers.getContractAt(
      "ShopPaymaster",
      ticketShopPaymasterAddress,
    ) as any

    const PAY_MASTER_INITIAL_FUND_ETH = 1

    await (
      await owner.sendTransaction({
        to: ticketShopPaymasterAddress,
        value: ethers.parseEther(`${PAY_MASTER_INITIAL_FUND_ETH}`),
      })
    ).wait()

    await (
      await ticketShopFactory.createTicketShop(
        TICKET_METADATA(),
        jpycAddress,
      )
    ).wait()

    return {
      jpyc,
      jpycAddress,
      ticketShopFactory,
      ticketShopFactoryAddress,
      ticketShop,
      ticketShopAddress,
      ticketShopPaymaster,
      ticketShopPaymasterAddress,
      owner,
      user_1,
      user_2,
    }
  }

  it("should able to sponsor transaction for ticket shop", async function() {
    const {
      user_1,
      jpyc,
      ticketShop,
      ticketShopAddress,
      ticketShopPaymasterAddress,
    } = await deployTicketShop()

    const provider = getProvider()

    const TICKET_TYPE_INDEX = 1

    const ticketMetadata = convertToStruct(
      await ticketShop.getTicketMetadata(),
    )

    const ticketPrice = Number(
      ticketMetadata.pricing[TICKET_TYPE_INDEX].price,
    )

    await (
      await jpyc
        .connect(user_1)
        .approve(ticketShopAddress, ticketPrice)
    ).wait()

    const shopPaymasterBeforeBalance = await provider.getBalance(ticketShopPaymasterAddress)
    const ethBalance_user1_before = await user_1.getBalance()
    const jpycBalance_user1_before = await jpyc.balanceOf(user_1.address)

    const paymasterParams = utils.getPaymasterParams(
      ticketShopPaymasterAddress,
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    )

    await (
      await ticketShop.connect(user_1).buyTicket(
        BigInt(TICKET_TYPE_INDEX),
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        },
      )
    ).wait()

    const shopPaymasterAfterBalance = await provider.getBalance(ticketShopPaymasterAddress)
    expect(shopPaymasterBeforeBalance - shopPaymasterAfterBalance).to.be.gt(0)

    const ethBalance_user1_after = await user_1.getBalance()
    expect(ethBalance_user1_before - ethBalance_user1_after).to.be.eq(0)

    const jpycBalance_user1_after = await jpyc.balanceOf(user_1.address)
    expect(jpycBalance_user1_before - jpycBalance_user1_after).to.be.eq(ticketPrice)
  })

  it("should not able to sponsor transaction of other contract", async function() {
    const {
      user_1,
      jpyc,
      ticketShopAddress,
      ticketShopPaymasterAddress,
    } = await deployTicketShop()

    const provider = getProvider()

    const shopPaymasterBeforeBalance = await provider.getBalance(ticketShopPaymasterAddress)
    const ethBalance_user1_before = await user_1.getBalance()

    const paymasterParams = utils.getPaymasterParams(
      ticketShopPaymasterAddress,
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    )

    try {
      await (
        await jpyc
          .connect(user_1)
          .approve(
            ticketShopAddress,
            BigInt(1_000),
            {
              customData: {
                gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
                paymasterParams: paymasterParams,
              },
            },
          )
      ).wait()
    } catch (err) {
      expect(err.message).to.include("no data present; likely require(false)")
    }

    const shopPaymasterAfterBalance = await provider.getBalance(ticketShopPaymasterAddress)
    expect(shopPaymasterBeforeBalance - shopPaymasterAfterBalance).to.be.eq(0)

    const ethBalance_user1_after = await user_1.getBalance()
    expect(ethBalance_user1_before - ethBalance_user1_after).to.be.eq(0)
  })
})
