export const TICKET_ERC20_ADDRESS = process.env.NEXT_PUBLIC_TICKET_ERC20_ADDRESS
export const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS
export const JPYC_ADDRESS = process.env.NEXT_PUBLIC_JPYC_ADDRESS
export const TICKET_SHOP_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_TICKET_SHOP_FACTORY_ADDRESS

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
