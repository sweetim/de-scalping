import { getDefaultConfig } from "connectkit"
import { zkSyncSepoliaTestnet } from "viem/chains"
import {
  createConfig,
  http,
} from "wagmi"

export const TICKET_ERC20_CONTRACT_ADDRESS = "0x8B39F9F171805ec9f9Ff0fD93461c301fCf51131"
export const SHOP_PAYMASTER_CONTRACT_ADDRESS = "0x5686c890827423ff58eb4C8fDe8D18C3cbCc11b3"
export const TICKET_SHOP_CONTRACT_ADDRESS = "0xCEE92F4e26B57e03510211760330cD787479957B"

export type TicketMetadata = {
  id: string
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
      zkSyncSepoliaTestnet,
      // zkSyncInMemoryNode,
    ],
    transports: {
      [zkSyncSepoliaTestnet.id]: http(),
      // [zkSyncInMemoryNode.id]: http(),
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
