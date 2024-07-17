import { zkSyncSepoliaTestnet } from "viem/chains"

export const TICKET_ERC20_ADDRESS = import.meta.env.VITE_TICKET_ERC20_ADDRESS
export const USDT_ADDRESS = import.meta.env.VITE_USDT_ADDRESS
export const JPYC_ADDRESS = import.meta.env.VITE_JPYC_ADDRESS
export const TICKET_SHOP_FACTORY_ADDRESS = import.meta.env.VITE_TICKET_SHOP_FACTORY_ADDRESS

export const CHAIN_TO_USE = zkSyncSepoliaTestnet // zkSyncInMemoryNode

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
