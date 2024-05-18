import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';
import { TicketMaster } from "../typechain-types";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0xbd294792265E8370676028F16e3A3F73732A7965";
if (!CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!";

// An example of a script to interact with the contract
export default async function () {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact("TicketMaster");

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  const ticketMetadata: TicketMaster.TicketMetadataStruct = {
    title: "Coldplay Concert Tokyo 2023",
    description: "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
    uri: "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",
    availableTickets: 1326,
    location: {
      name: "Tokyo Dome, Japan",
      uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7"
    },
    pricing_1: {
      name: "Gold",
      description: "exclusive merchandise and a dedicated entrance",
      amount: 500
    },
    pricing_2: {
      name: "Balcony",
      description: "secure your spot for a great view of the stage",
      amount: 250
    },
    pricing_3: {
      name: "S",
      description: "this section offers a fantastic view of the performance",
      amount: 200
    },
    pricing_4: {
      name: "A",
      description: "affordable option provides a great concert experience",
      amount: 160
    }
  }
  const id = uuidv4()
  await contract.createNewTicket(id, ticketMetadata)
  console.log(`added new ticket (${id})`)
  const item = await contract.getTicketMetadata(id)
  console.log(item)
}
