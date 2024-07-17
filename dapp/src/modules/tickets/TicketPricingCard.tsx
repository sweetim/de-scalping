import { TicketPricing } from "@/contract"
import { FC } from "react"

type TicketPricingCardProps = {
  pricing: TicketPricing
  symbol?: string
}

const TicketPricingCard: FC<TicketPricingCardProps> = ({ pricing, symbol }) => {
  return (
    <div className="bg-white/80 rounded-lg p-3 w-full">
      <div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{pricing.name}</h2>
          <div className="bg-purple-300 max-w-fit p-1 font-bold rounded-xl">
            <p>{Number(pricing.totalTickets - pricing.soldTickets)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{pricing.description}</p>
        <p className="mt-5 text-xl font-bold">{`${pricing.price.toLocaleString()} ${symbol || "JPYC"}`}</p>
      </div>
    </div>
  )
}

export default TicketPricingCard
