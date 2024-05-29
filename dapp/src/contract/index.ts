import { getDefaultConfig } from "connectkit"
import {
  zkSyncInMemoryNode,
  zkSyncSepoliaTestnet,
} from "viem/chains"
import {
  createConfig,
  http,
} from "wagmi"

export const SHOP_PAYMASTER_CONTRACT_ADDRESS = "0x0a67078A35745947A37A552174aFe724D8180c25"
export const TICKET_SHOP_CONTRACT_ADDRESS = "0x1F0151386fB0AbBF0273238dF5E9bc519DE5e20B"
export const TICKET_ERC20_CONTRACT_ADDRESS = "0x65C899B5fb8Eb9ae4da51D67E1fc417c7CB7e964"

export type TicketMetadata = {
  title: string
  description: string
  uri: string
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
      zkSyncSepoliaTestnet,
    ],
    transports: {
      [zkSyncInMemoryNode.id]: http(),
      [zkSyncSepoliaTestnet.id]: http(),
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
