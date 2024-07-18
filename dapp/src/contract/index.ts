import { match } from "ts-pattern"
import { zkSyncSepoliaTestnet } from "viem/chains"

export const TICKET_ERC20_ADDRESS = import.meta.env.VITE_TICKET_ERC20_ADDRESS
export const USDT_ADDRESS = import.meta.env.VITE_USDT_ADDRESS
export const JPYC_ADDRESS = import.meta.env.VITE_JPYC_ADDRESS
export const TICKET_SHOP_FACTORY_ADDRESS = import.meta.env.VITE_TICKET_SHOP_FACTORY_ADDRESS

export const CHAIN_TO_USE = zkSyncSepoliaTestnet // zkSyncInMemoryNode

export type SupportedErc20Symbol = "USDT" | "JPYC" | "USDC"

export const ERC20_SYMBOL_METADATA: Record<SupportedErc20Symbol | "ETH" | "TKT", { name: string; icon: string }> = {
  USDT: {
    name: "USDT",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
  },
  JPYC: {
    name: "JPYC",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
  },
  USDC: {
    name: "USDC",
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=032",
  },
  ETH: {
    name: "ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
  },
  TKT: {
    name: "TKT",
    icon: "/scalp.png",
  },
}

export function getErc20AddressFrom(symbol: SupportedErc20Symbol): `0x${string}` {
  return match(symbol)
    .with("USDT", () => USDT_ADDRESS)
    .with("JPYC", () => JPYC_ADDRESS)
    .with("USDC", () => USDT_ADDRESS)
    .otherwise(() => JPYC_ADDRESS)
}

export type TicketMetadataOnChain = {
  id: string
  name: string
  description: string
  uri: string
  dates: readonly [bigint, bigint]
  location: TicketLocation
  pricing: readonly TicketPricing[]
}

export type TicketMetadata = {
  id: string
  name: string
  description: string
  uri: string
  dates: [bigint, bigint]
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
  soldTickets: bigint
  totalTickets: bigint
}

export type TicketNftTokenUri = {
  name: string
  description: string
  image: string
  startDate: number
  endDate: number
  locationName: string
  locationUri: string
  ticketId: number
  ticketType: string
}

export type TicketNftTokenUriRaw = {
  name: string
  description: string
  image: string
  attributes: TicketNftTokenAttributes[]
}

export type TicketNftTokenAttributes = {
  display_type?: "date"
  trait_type: string
  value: number | string
}
