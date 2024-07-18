import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import {
  SupportedErc20Symbol,
  TicketMetadata,
} from "@/contract"
import { v4 as uuidv4 } from "uuid"
import { EditTicketPriceItem } from "./EditTicketPriceTable"

type TicketStoreForm = {
  ticketMetadata: TicketMetadata
  erc20Symbol: SupportedErc20Symbol | null
}

type EditTicketStoreState = {
  data: TicketStoreForm
}

type EditTicketStoreActions = {
  setNameForm: (input: string) => void
  setDescriptionForm: (input: string) => void
  setDateRangeForm: (input: string[]) => void
  setLocationForm: (input: number[]) => void
  setImageUriForm: (input: string) => void
  setSupportedErc20SymbolForm: (input: SupportedErc20Symbol) => void
  setTicketPricingForm: (input: EditTicketPriceItem[]) => void
}

function generateDefaultTicketMetadata(): TicketStoreForm {
  return {
    ticketMetadata: {
      id: uuidv4(),
      name: "",
      description: "",
      uri: "",
      dates: [
        BigInt(Date.now()),
        BigInt(Date.now()),
      ],
      location: {
        name: "",
        uri: "",
      },
      pricing: [],
    },
    erc20Symbol: null,
  }
}

export const useEditTicketStore = create<EditTicketStoreState & EditTicketStoreActions>()(
  immer((set) => ({
    data: generateDefaultTicketMetadata(),
    setNameForm: (input: string) =>
      set(
        state => {
          state.data.ticketMetadata.name = input
        },
      ),
    setDescriptionForm: (input: string) =>
      set(
        state => {
          state.data.ticketMetadata.description = input
        },
      ),
    setDateRangeForm: (input: string[]) =>
      set(
        state => {
          const [ startDate, endDate ] = input
            .map(item => BigInt((new Date(item)).getTime()))

          state.data.ticketMetadata.dates = [ startDate, endDate ]
        },
      ),
    setLocationForm: (input: number[]) =>
      set(
        state => {
          const [ lat, lng ] = input

          state.data.ticketMetadata.location = {
            name: "Tokyo Dome, Tokyo",
            uri: `http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`,
          }
        },
      ),
    setImageUriForm: (input: string) =>
      set(
        state => {
          state.data.ticketMetadata.uri = input
        },
      ),
    setSupportedErc20SymbolForm: (input: SupportedErc20Symbol) =>
      set(
        state => {
          state.data.erc20Symbol = input
        },
      ),
    setTicketPricingForm: (input: EditTicketPriceItem[]) =>
      set(
        state => {
          state.data.ticketMetadata.pricing = input.map(item => ({
            name: item.name,
            description: item.description,
            price: BigInt(item.price),
            totalTickets: BigInt(item.totalTickets),
            soldTickets: BigInt(0),
          }))
        },
      ),
  })),
)
