import { TicketMetadata } from "@/contract"
import { useReadTicketShopGetTicketMetadata } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import {
  CenterDiv,
  LoadingGif,
  TicketBuyingCard,
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import { Grid } from "antd"
import { useParams } from "react-router-dom"
import { match } from "ts-pattern"

const { useBreakpoint } = Grid

export type TicketPageParams = {
  address: `0x${string}`
}

export default function EventAddressPage() {
  const { address } = useParams<TicketPageParams>()
  const { isConnected } = useWalletInfo()
  const screens = useBreakpoint()

  const { data: ticketMetadata, isSuccess } = useReadTicketShopGetTicketMetadata({
    address,
  })

  const metadata = ticketMetadata as TicketMetadata

  const renderLoading = () => (
    <CenterDiv>
      <LoadingGif />
    </CenterDiv>
  )

  const renderTicketMobile = () => (
    <div className="grid grid-cols-1 gap-2">
      <TicketMetadataCard metadata={metadata} />
      {metadata.pricing.map(
        item => (
          <div className="px-3">
            <TicketPricingCard
              key={item.name}
              pricing={item}
            />
          </div>
        ),
      )}
      {isConnected && <TicketBuyingCard pricing={metadata.pricing} />}
    </div>
  )

  const renderTicketDesktop = () => (
    <CenterDiv>
      <div className="grid grid-cols-2">
        <TicketMetadataCard metadata={metadata} />
        <div className="grid grid-cols-2 gap-2 max-w-lg py-3">
          {metadata.pricing.map(
            item => (
              <TicketPricingCard
                key={item.name}
                pricing={item}
              />
            ),
          )}
          <div className="col-span-2">
            {isConnected && <TicketBuyingCard pricing={metadata.pricing} />}
          </div>
        </div>
      </div>
    </CenterDiv>
  )

  const renderTicket = match(screens)
    .with({ xs: true }, () => renderTicketMobile)
    .otherwise(() => renderTicketDesktop)

  return (
    <>
      {isSuccess ? renderTicket() : renderLoading()}
    </>
  )
}
