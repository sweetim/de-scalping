"use client"

import {
  TICKET_SHOP_CONTRACT_ADDRESS,
  TicketMetadata,
} from "@/contract"
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

export type TicketPageProps = {
  params: {
    id: string
  }
}

export default function CollectionPage({ params }: TicketPageProps) {
  const { id } = params
  const ticketId = "01547b4d-7411-425f-ab99-11336de80c64" // "a0790b0b-66b1-4e31-8e21-fbbbb3bf7f3a"
  const { data: ticketMetadata, isSuccess } = useReadTicketShopGetTicketMetadata({
    address: TICKET_SHOP_CONTRACT_ADDRESS,
    args: [
      ticketId,
    ],
  })

  const metadata: TicketMetadata = ticketMetadata as any
  console.log(metadata)
  const renderLoading = () => (
    <CenterDiv>
      <LoadingGif />
    </CenterDiv>
  )

  const renderTicket = () => (
    <CenterDiv>
      <Row>
        <Col sm={{ flex: "auto" }}>
          <TicketMetadataCard metadata={metadata} />
        </Col>
        <Col span={12} className="overflow-auto p-5 h-full">
          <Row>
            {metadata.pricing.map(item => <TicketPricingCard key={item.name} pricing={item} />)}
          </Row>
          <Row>
            <TicketBuyingCard id={ticketId} pricing={metadata.pricing} />
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
