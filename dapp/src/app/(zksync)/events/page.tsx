"use client"

import {
  TICKET_SHOP_CONTRACT_ADDRESS,
  TicketMetadata,
} from "@/contract"
import { useReadTicketShopGetAllCollection } from "@/generated"
import {
  CenterDiv,
  LoadingGif,
} from "@/modules"
import Link from "next/link"
export default function EventPage() {
  const { data, isSuccess } = useReadTicketShopGetAllCollection({
    address: TICKET_SHOP_CONTRACT_ADDRESS,
  })

  if (!isSuccess) {
    return (
      <CenterDiv>
        <LoadingGif />
      </CenterDiv>
    )
  }

  const renderTickets = data.filter(({ id }) => id !== "0b009db2-bf56-4cc3-817d-5c71038f4470").map(
    (x, i) => {
      const metadata = x as TicketMetadata

      return (
        <Link key={metadata.id} href={`/ticket/${metadata.id}`}>
          <div className="bg-white p-5 m-3 rounded-2xl min-w-[28rem] max-w-[28rem]">
            <h1 className="text-xl font-bold">{metadata.title}</h1>
            <p className="text-gray-500 text-base">
              November 6 - 7, 2023 | {metadata.location.name}
            </p>
            <img
              className="rounded-xl my-2"
              src={metadata.uri}
              alt="ticket-image"
            />
            <section className="text-gray-500">{metadata.description}</section>
          </div>
        </Link>
      )
    },
  )

  return (
    <div className="flex flex-row flex-wrap">
      {renderTickets}
    </div>
  )
}
