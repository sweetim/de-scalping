"use client"

import {
  TICKET_SHOP_FACTORY_ADDRESS,
  TicketMetadata,
} from "@/contract"
import {
  useReadTicketShopFactoryGetTicketShops,
  useReadTicketShopGetTicketMetadata,
} from "@/generated"
import {
  CenterDiv,
  LoadingGif,
} from "@/modules"
import Link from "next/link"
import { FC } from "react"

export default function EventPage() {
  const { data: ticketShops, isSuccess, status } = useReadTicketShopFactoryGetTicketShops({
    address: TICKET_SHOP_FACTORY_ADDRESS,
  })
  console.log(isSuccess, status)
  if (!isSuccess) {
    return (
      <CenterDiv>
        <LoadingGif />
      </CenterDiv>
    )
  }

  const renderTicketShops = ticketShops
    .map(address => <TicketShopCard key={address} address={address} />)

  return (
    <div className="flex flex-row flex-wrap">
      {renderTicketShops}
    </div>
  )
}

type TicketShopCardProps = {
  address: `0x${string}`
}

const TicketShopCard: FC<TicketShopCardProps> = ({ address }) => {
  const { data: metadata, isSuccess } = useReadTicketShopGetTicketMetadata({
    address,
  })

  if (!isSuccess) {
    return <p>loading...</p>
  }

  return (
    <Link key={address} href={`/ticket/${address}`}>
      <div className="bg-white p-5 m-3 rounded-2xl min-w-[28rem] max-w-[28rem]">
        <h1 className="text-xl font-bold">{metadata.name}</h1>
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
}
