export const CONTRACT_ADDRESS = "0x111C3E89Ce80e62EE88318C2804920D4c96f92bb"

export type TicketMetadata = {
  title: string,
  description: string,
  uri: string,
  availableTickets: number,
  location: TicketLocation,
  pricing: TicketPricing[]
}

export type TicketLocation = {
  name: string,
  uri: string
}

export type TicketPricing = {
  name: string
  description: string
  amount: number
}

type TicketMetadataOnChain = {
  title: string,
  description: string,
  uri: string,
  availableTickets: number,
  location: TicketLocation,
  pricing_1: TicketPricing,
  pricing_2: TicketPricing,
  pricing_3: TicketPricing,
  pricing_4: TicketPricing,
}

export const convertOnChainToTicketMetadata = (data: TicketMetadataOnChain): TicketMetadata => {
  if (!data) {
    return {
      title: "",
      description: "",
      uri: "",
      availableTickets: 0,
      location: {
        name: "",
        uri: ""
      },
      pricing: []
    }
  }

  const { pricing_1, pricing_2, pricing_3, pricing_4, ...others } = data

  return {
    ...others,
    pricing: [
      pricing_1,
      pricing_2,
      pricing_3,
      pricing_4,
    ]
  }
}