import { TicketPricing } from "@/contract"
import { FC } from "react"

type TicketPricingCardProps = {
  pricing: TicketPricing
}

const TicketPricingCard: FC<TicketPricingCardProps> = ({ pricing }) => {
  return (
    <div className="bg-white rounded-lg p-3 min-w-64 max-w-64 m-3">
      <div>
        <h2 className="text-xl font-bold">{pricing.name}</h2>
        <p className="text-sm text-gray-500">{pricing.description}</p>
        <p className="mt-5 text-xl font-bold">{`${pricing.amount} USDC`}</p>
      </div>
    </div>
  )
}

export default TicketPricingCard
