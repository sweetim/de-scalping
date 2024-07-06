import { TicketMetadata } from "@/contract"
import { useReadTicketShopGetTicketMetadata } from "@/generated"
import {
  CenterDiv,
  LoadingGif,
  TicketBuyingCard,
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import {
  Col,
  Row,
} from "antd"
import { useParams } from "react-router-dom"

export type TicketPageParams = {
  address: `0x${string}`
}

export default function TicketAddressPage() {
  const { address } = useParams<TicketPageParams>()

  const { data: ticketMetadata, isSuccess } = useReadTicketShopGetTicketMetadata({
    address,
  })

  const metadata = ticketMetadata as TicketMetadata

  const renderLoading = () => (
    <CenterDiv>
      <LoadingGif />
    </CenterDiv>
  )

  const renderTicket = () => (
    <CenterDiv>
      <Row>
        <Col span={12} sm={{ flex: "auto" }}>
          <TicketMetadataCard metadata={metadata} />
        </Col>
        <Col span={12} className="overflow-auto h-full">
          <Row>
            {metadata.pricing.map(
              item => (
                <TicketPricingCard
                  key={item.name}
                  pricing={item}
                />
              ),
            )}
          </Row>
          <Row>
            <TicketBuyingCard pricing={metadata.pricing} />
          </Row>
        </Col>
      </Row>
    </CenterDiv>
  )

  return (
    <>
      {isSuccess ? renderTicket() : renderLoading()}
    </>
  )
}
