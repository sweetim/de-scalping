import { ethers } from "ethers"
import * as hre from "hardhat"
import { TicketERC20 } from "../typechain-types"
import { getWallet } from "./utils"

const TICKET_ERC20_CONTRACT_ADDRESS = "0x5fE58d975604E6aF62328d9E505181B94Fc0718C"
if (!TICKET_ERC20_CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

const TO_ADDRESS = "0xBC989fDe9e54cAd2aB4392Af6dF60f04873A033A"

export default async function() {
  console.log(`Running script to interact with contract ${TICKET_ERC20_CONTRACT_ADDRESS}`)

  const contractArtifact = await hre.artifacts.readArtifact(
    "TicketERC20",
  )

  const contract: TicketERC20 = new ethers.Contract(
    TICKET_ERC20_CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet(),
  ) as any

  await contract.mint(TO_ADDRESS, BigInt(100))
  console.log("minted ", await contract.balanceOf(TO_ADDRESS))
}
