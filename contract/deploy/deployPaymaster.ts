import * as ethers from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { utils } from "zksync-ethers"
import { Counter } from "../typechain-types"
import {
  deployContract,
  getProvider,
  getWallet,
} from "./utils"
export default async function(hre: HardhatRuntimeEnvironment) {
  const erc20 = await deployContract("TicketERC20", ["Ticket", "TKT", 0])
  const erc20Address = await erc20.getAddress()
  const paymaster = await deployContract("MyPaymaster", [erc20Address])

  const paymasterAddress = await paymaster.getAddress()

  const counter: Counter = await deployContract("Counter", []) as any
  const counterAddress = await counter.getAddress()

  // Supplying paymaster with ETH
  console.log("Funding paymaster with ETH...")
  const wallet = getWallet()

  await (
    await wallet.sendTransaction({
      to: paymasterAddress,
      value: ethers.parseEther("0.06"),
    })
  ).wait()

  const provider = getProvider()
  const paymasterBalance = await provider.getBalance(paymasterAddress)
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`)

  // Supplying the ERC20 tokens to the wallet:
  // We will give the wallet 3 units of the token:
  await (await erc20.mint(wallet.address, 15)).wait()

  console.log("Minted 5 tokens for the wallet")
  console.log(`Done!`)

  const paymasterParams = utils.getPaymasterParams(paymasterAddress, {
    type: "ApprovalBased",
    token: erc20Address,
    // set minimalAllowance as we defined in the paymaster contract
    minimalAllowance: BigInt("3"),
    // empty bytes as testnet paymaster does not use innerInput
    innerInput: new Uint8Array(),
  })

  const gasLimit = await counter.increment.estimateGas(
    {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    },
  )
  console.log(`before Paymaster ERC20 token balance is now ${await erc20.balanceOf(paymasterAddress)}`)

  console.log(gasLimit)
  await (
    await counter.increment({
      // paymaster info
      customData: {
        paymasterParams: paymasterParams,
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      },
    })
  ).wait()

  console.log(`user ${await erc20.balanceOf(wallet.address)}`)
  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(paymasterAddress)}`)
  console.log(await provider.getBalance(paymasterAddress))
  console.log(await counter.getValue())

  await (
    await counter.increment({
      // paymaster info
      customData: {
        paymasterParams: paymasterParams,
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      },
    })
  ).wait()

  console.log(`user ${await erc20.balanceOf(wallet.address)}`)
  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(paymasterAddress)}`)
  console.log(await provider.getBalance(paymasterAddress))
  console.log(await counter.getValue())
  // const gasLimit = await counter.increment.estimateGas(

  //     wallet.address,
  //   {
  //   customData: {
  //     gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
  //     paymasterParams: paymasterParams,
  //   }

  // )

  // console.log(gasLimit)
}
