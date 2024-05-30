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
  // const ticketId = "ec87f4b7-0215-46af-82b2-82c9f4e69d02" // "a0790b0b-66b1-4e31-8e21-fbbbb3bf7f3a"
  const { data: ticketMetadata, isSuccess } = useReadTicketShopGetTicketMetadata({
    address: TICKET_SHOP_CONTRACT_ADDRESS,
    args: [
      id,
    ],
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
            <TicketBuyingCard id={id} pricing={metadata.pricing} />
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
