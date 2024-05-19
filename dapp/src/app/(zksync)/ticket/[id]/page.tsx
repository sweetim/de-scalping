"use client"

import { Col, Row } from "antd";
import { CONTRACT_ADDRESS, TicketMetadata, convertOnChainToTicketMetadata } from "@/contract";
import { CenterDiv,
  LoadingGif,
  TicketPricingCard,
  TicketBuyingCard,
  TicketMetadataCard
} from "@/modules";
import { useReadTicketMasterGetTicketMetadata, useWriteTicketMasterBuyTicket } from "@/generated"

export type TicketPageProps = {
  params: {
    id: string
  }
}

export default function CollectionPage({ params }: TicketPageProps) {
  const { id } = params;

  const ticketId = id; // "a0790b0b-66b1-4e31-8e21-fbbbb3bf7f3a"
  const { data, isSuccess, status, error } = useReadTicketMasterGetTicketMetadata({
    address: CONTRACT_ADDRESS,
    args: [
      ticketId
    ]
  })
  console.log(status, error)
  const metadata: TicketMetadata = convertOnChainToTicketMetadata(data as any)

  const renderLoading = () => (
    <CenterDiv>
      <LoadingGif />
    </CenterDiv>
  )

  const renderTicket = () => (
    <Row
      className="h-full bg-colorful">
      <Col sm={{ flex: "auto" }}>
        <TicketMetadataCard metadata={metadata} />
      </Col>
      <Col span={12}
        className="overflow-auto p-5 h-full">
        <Row>
          {metadata.pricing.map(item => (
            <TicketPricingCard key={item.name} pricing={item} />
          ))}
        </Row>
        <Row>
          <TicketBuyingCard id={ticketId} pricing={metadata.pricing} />
        </Row>
      </Col>
    </Row>
  )

  return (
   <>
   { isSuccess ? renderTicket() : renderLoading() }
   </>
  );
};
