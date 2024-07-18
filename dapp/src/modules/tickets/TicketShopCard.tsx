import { useReadTicketShopGetTicketMetadata } from "@/generated"
import { FC } from "react"
import { Link } from "react-router-dom"

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
    <Link key={address} to={`/app/events/${address}`}>
      <div className="bg-white/80 p-3 rounded-2xl">
        <h1 className="text-xl font-bold">{metadata.name}</h1>
        <p className="text-gray-500 text-base">
          November 6 - 7, 2023 | {metadata.location.name}
        </p>
        <img
          className="rounded-xl my-2 w-full sm:min-h-40 sm:max-h-40 object-cover"
          src={metadata.uri}
          alt="ticket-image"
        />
        <section className="text-gray-600">{metadata.description}</section>
      </div>
    </Link>
  )
}

export default TicketShopCard
