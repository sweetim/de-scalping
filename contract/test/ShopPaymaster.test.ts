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
      jpycAddress,
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

    const ethBalance_user1_beforeAprrove = await user_1.getBalance()
    console.log(`eth balance before ${ethBalance_user1_beforeAprrove}`)
    const paymasterParams = utils.getPaymasterParams(
      ticketShopPaymasterAddress,
      {
        type: "ApprovalBased",
        token: jpycAddress,
        minimalAllowance: BigInt(1),
        innerInput: new Uint8Array(),
      },
    )

    await (
      await jpyc
        .connect(user_1)
        .approve(
          ticketShopAddress,
          ticketPrice,
          {
            customData: {
              gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
              paymasterParams: paymasterParams,
            },
          },
        )
    ).wait()

    const shopPaymasterBeforeBalance = await provider.getBalance(ticketShopPaymasterAddress)
    const ethBalance_user1_afterApprove = await user_1.getBalance()
    const jpycBalance_user1_before = await jpyc.balanceOf(user_1.address)

    expect(ethBalance_user1_beforeAprrove - ethBalance_user1_afterApprove).to.be.eq(0)

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

    const ethBalance_user1_afterBuyTicket = await user_1.getBalance()
    expect(ethBalance_user1_afterApprove - ethBalance_user1_afterBuyTicket).to.be.eq(0)

    const jpycBalance_user1_after = await jpyc.balanceOf(user_1.address)
    expect(jpycBalance_user1_before - jpycBalance_user1_after).to.be.eq(ticketPrice + 1)
  })
})
