import { getDefaultConfig } from "connectkit"
import { zkSyncInMemoryNode } from "viem/chains"
import {
  createConfig,
  http,
} from "wagmi"

export const TICKET_ERC20_CONTRACT_ADDRESS = "0x094499Df5ee555fFc33aF07862e43c90E6FEe501"
export const SHOP_PAYMASTER_CONTRACT_ADDRESS = "0xb76eD02Dea1ba444609602BE5D587c4bFfd67153"
export const TICKET_SHOP_CONTRACT_ADDRESS = "0xf2FcC18ED5072b48C0a076693eCa72fE840b3981"

export type TicketMetadata = {
  title: string
  description: string
  uri: string
  dates: string[]
  location: TicketLocation
  pricing: TicketPricing[]
}

export type TicketLocation = {
  name: string
  uri: string
}

export type TicketPricing = {
  name: string
  description: string
  price: bigint
  tickets: bigint
}

export const WALLET_CONFIG = createConfig(
  getDefaultConfig({
    chains: [
      zkSyncInMemoryNode,
      // zkSyncSepoliaTestnet,
    ],
    transports: {
      [zkSyncInMemoryNode.id]: http(),
      // [zkSyncSepoliaTestnet.id]: http(),
    },
    walletConnectProjectId: "3744d5a2fe976f821f378bdd74fcab66",
    appName: "de-scalper",
    ssr: true,
    // Optional App Info
    appDescription: "decentralized ticket platform",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png",
  }),
)
