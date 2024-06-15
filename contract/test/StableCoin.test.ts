import { expect } from "chai"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import { JPYC } from "../typechain-types"

describe("StableCoins", function() {
  async function deployStableCoins() {
    const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
    const user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
    const user_2 = getWallet(LOCAL_RICH_WALLETS[2].privateKey)

    const jpyc: JPYC = await deployContract(
      "JPYC",
      [],
      {
        wallet: owner,
        silent: true,
      },
    ) as any

    return {
      jpyc,
      owner,
      user_1,
      user_2,
    }
  }

  it("should return correct decimals value", async () => {
    const { jpyc } = await deployStableCoins()

    expect(await jpyc.decimals()).to.be.eq(0)
  })

  it("should able to mint by owner", async function() {
    const { jpyc, user_1 } = await deployStableCoins()

    const MINT_AMOUNT = BigInt(100_000)
    const balance_before = await jpyc.balanceOf(user_1.address)

    await jpyc.mint(
      user_1.address,
      MINT_AMOUNT,
    )

    const balance_after = await jpyc.balanceOf(user_1.address)

    expect(balance_after - balance_before).to.be.eq(MINT_AMOUNT)
  })

  it("should not able to mint if it is not owner", async function() {
    const { jpyc, user_1, user_2 } = await deployStableCoins()

    const MINT_AMOUNT = BigInt(100_000)
    const balance_before = await jpyc.balanceOf(user_1.address)

    try {
      await jpyc.connect(user_1).mint(
        user_2.address,
        MINT_AMOUNT,
      )
    } catch (e) {
      expect(e.message).to.include("Ownable: caller is not the owner")
    }

    const balance_after = await jpyc.balanceOf(user_1.address)

    expect(balance_after - balance_before).to.be.eq(0)
  })

  it("should able to transfer by owner", async () => {
    const { jpyc, user_1, user_2 } = await deployStableCoins()

    const MINT_AMOUNT = BigInt(100_000)
    const AMOUNT_TO_TRANSFER = BigInt(10_000)

    await (
      await jpyc.mint(
        user_1.address,
        MINT_AMOUNT,
      )
    ).wait()

    const balance_before_user_1 = await jpyc.balanceOf(user_1.address)
    const balance_before_user_2 = await jpyc.balanceOf(user_2.address)

    expect(balance_before_user_1).to.be.eq(MINT_AMOUNT)
    expect(balance_before_user_2).to.be.eq(0)

    await (
      await jpyc.connect(user_1)
        .transfer(
          user_2.address,
          BigInt(10_000),
        )
    ).wait()

    const balance_after_user_1 = await jpyc.balanceOf(user_1.address)
    const balance_after_user_2 = await jpyc.balanceOf(user_2.address)

    expect(balance_before_user_1 - balance_after_user_1).to.be.eq(AMOUNT_TO_TRANSFER)
    expect(balance_after_user_2 - balance_before_user_2).to.be.eq(AMOUNT_TO_TRANSFER)
  })

  it("should able to transfer by non owner", async () => {
    const { jpyc, user_1, user_2 } = await deployStableCoins()

    const MINT_AMOUNT = BigInt(100_000)
    const ALLOWANCE_ALLOWED = BigInt(20_000)
    const AMOUNT_TO_TRANSFER = BigInt(10_000)

    await (
      await jpyc.mint(
        user_1.address,
        MINT_AMOUNT,
      )
    ).wait()

    const balance_before_user_1 = await jpyc.balanceOf(user_1.address)
    const balance_before_user_2 = await jpyc.balanceOf(user_2.address)
    const allowance_before_user_2 = await jpyc.allowance(user_1.address, user_2.address)

    expect(balance_before_user_1).to.be.eq(MINT_AMOUNT)
    expect(balance_before_user_2).to.be.eq(0)
    expect(allowance_before_user_2).to.be.eq(0)

    await (
      await jpyc.connect(user_1)
        .approve(
          user_2.address,
          BigInt(ALLOWANCE_ALLOWED),
        )
    ).wait()

    const allowance_after_user_2 = await jpyc.allowance(
      user_1.address,
      user_2.address,
    )

    expect(allowance_after_user_2).to.be.eq(ALLOWANCE_ALLOWED)

    await (
      await jpyc.connect(user_2)
        .transferFrom(
          user_1.address,
          user_2.address,
          BigInt(10_000),
        )
    ).wait()

    const balance_after_user_1 = await jpyc.balanceOf(user_1.address)
    const balance_after_user_2 = await jpyc.balanceOf(user_2.address)

    expect(balance_before_user_1 - balance_after_user_1).to.be.eq(AMOUNT_TO_TRANSFER)
    expect(balance_after_user_2 - balance_before_user_2).to.be.eq(AMOUNT_TO_TRANSFER)

    const allowance_afterTransfer_user_2 = await jpyc.allowance(
      user_1.address,
      user_2.address,
    )
    expect(allowance_afterTransfer_user_2).to.be.eq(ALLOWANCE_ALLOWED - AMOUNT_TO_TRANSFER)
  })
})
