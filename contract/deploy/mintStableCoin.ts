import { ethers } from "ethers"
import * as hre from "hardhat"
import { TicketERC20 } from "../typechain-types"
import { getWallet } from "./utils"

const TICKET_ERC20_ADDRESS = process.env.TICKET_ERC20_ADDRESS
const USDT_ADDRESS = process.env.USDT_ADDRESS
const JPYC_ADDRESS = process.env.JPYC_ADDRESS

if (!TICKET_ERC20_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"
if (!USDT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"
if (!JPYC_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

const TO_ADDRESS = "0x4538Df273c05289DC7491a6cf01acF54F3D1F189"

export default async function() {
  const mintToData = [
    {
      contractName: "TicketERC20",
      contractAddress: TICKET_ERC20_ADDRESS!,
      amount: BigInt(1_000),
    },
    {
      contractName: "JPYC",
      contractAddress: JPYC_ADDRESS!,
      amount: BigInt(100_000),
    },
    {
      contractName: "USDT",
      contractAddress: USDT_ADDRESS!,
      amount: BigInt(1_000),
    },
  ]

  for (const item of mintToData) {
    const contractArtifact = await hre.artifacts.readArtifact(
      item.contractName,
    )

    const contract: TicketERC20 = new ethers.Contract(
      item.contractAddress,
      contractArtifact.abi,
      getWallet(),
    ) as any

    await contract.mint(TO_ADDRESS, BigInt(item.amount))

    console.log(`${item.contractName} minted `, await contract.balanceOf(TO_ADDRESS))
  }
}
