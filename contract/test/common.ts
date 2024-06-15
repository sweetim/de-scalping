import { v4 as uuidv4 } from "uuid"
import { TicketSchema } from "../typechain-types/contracts/TicketShop"

export const TICKET_METADATA = (id = uuidv4()): TicketSchema.MetadataStruct => ({
  id,
  name: "Coldplay Concert Tokyo 2023",
  description:
    "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
  uri:
    "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",
  dates: [
    1675987200,
    1676246400,
  ],
  location: {
    name: "Tokyo Dome, Japan",
    uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
  },
  pricing: [
    {
      name: "Gold",
      description: "exclusive merchandise and a dedicated entrance",
      price: 500,
      tickets: 1,
    },
    {
      name: "Balcony",
      description: "secure your spot for a great view of the stage",
      price: 250,
      tickets: 100,
    },
    {
      name: "S",
      description: "this section offers a fantastic view of the performance",
      price: 200,
      tickets: 100,
    },
    {
      name: "A",
      description: "affordable option provides a great concert experience",
      price: 160,
      tickets: 100,
    },
  ],
})

export function convertToStruct(input: TicketSchema.MetadataStructOutput): TicketSchema.MetadataStruct {
  const [
    id,
    name,
    description,
    uri,
    dates,
    location,
    pricing,
  ] = input

  return {
    id,
    name,
    description,
    uri,
    dates: [
      dates[0],
      dates[1],
    ],
    location: {
      name: location[0],
      uri: location[1],
    },
    pricing: pricing.map(item => {
      const [
        name,
        description,
        price,
        tickets,
      ] = item

      return {
        name,
        description,
        price: Number(price),
        tickets: Number(tickets),
      }
    }),
  }
}
