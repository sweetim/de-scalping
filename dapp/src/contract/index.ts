import { getDefaultConfig } from "connectkit"
import { zkSyncInMemoryNode } from "viem/chains"
import {
  createConfig,
  http,
} from "wagmi"

export const TICKET_ERC20_ADDRESS = "0xb76eD02Dea1ba444609602BE5D587c4bFfd67153"
export const USDT_ADDRESS = "0xf2FcC18ED5072b48C0a076693eCa72fE840b3981"
export const JPYC_ADDRESS = "0x5fE58d975604E6aF62328d9E505181B94Fc0718C"
export const TICKET_SHOP_FACTORY_ADDRESS = "0x094499Df5ee555fFc33aF07862e43c90E6FEe501"

export type TicketMetadata = {
  id: string
  name: string
  description: string
  uri: string
  dates: readonly [bigint, bigint]
  location: TicketLocation
  pricing: readonly TicketPricing[]
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
      // zkSyncSepoliaTestnet,
      zkSyncInMemoryNode,
    ],
    transports: {
      // [zkSyncSepoliaTestnet.id]: http(),
      [zkSyncInMemoryNode.id]: http(),
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
