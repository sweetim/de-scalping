export const TICKET_ERC20_ADDRESS = "0x111C3E89Ce80e62EE88318C2804920D4c96f92bb"
export const USDT_ADDRESS = "0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021"
export const JPYC_ADDRESS = "0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B"
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
