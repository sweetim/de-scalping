import { TICKET_SHOP_FACTORY_ADDRESS } from "@/contract"
import { useReadTicketShopFactoryGetTicketShops } from "@/generated"
import {
  CenterDiv,
  LoadingGif,
  TicketShopCard,
} from "@/modules"

export default function EventPage() {
  const { data: ticketShops, isSuccess } = useReadTicketShopFactoryGetTicketShops({
    address: TICKET_SHOP_FACTORY_ADDRESS,
  })

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
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {renderTicketShops}
    </div>
  )
}
