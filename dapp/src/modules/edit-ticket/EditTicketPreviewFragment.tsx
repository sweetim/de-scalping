import { FC } from "react"
import {
  TicketMetadataCard,
  TicketPricingCard,
} from "../tickets"
import { useEditTicketStore } from "./useEditTicketStore"

const EditTicketPreviewFragment: FC = () => {
  const ticketMetadata = useEditTicketStore(state => state.data.ticketMetadata)

  return (
    <div className="grid grid-cols-2">
      <TicketMetadataCard metadata={ticketMetadata} />
      <div className="grid grid-cols-2 gap-2 max-w-lg py-3">
        {ticketMetadata.pricing.map(
          item => (
            <TicketPricingCard
              key={item.name}
              pricing={item}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default EditTicketPreviewFragment
