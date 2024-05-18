"use client"

import { FC } from "react";
import { Col, Row } from "antd";
import { CONTRACT_ADDRESS, TicketMetadata, convertOnChainToTicketMetadata } from "@/contract";
import TicketMetadataCard from "@/modules/TicketMetadataCard";
import TicketPricingCard from "@/modules/TicketPricingCard";
import TicketBuyingCard from "@/modules/TicketBuyingCard"
import { useReadTicketMasterGetTicketMetadata, useWriteTicketMasterBuyTicket } from "@/generated"

export type TicketPageProps = {
  params: {
    id: string
  }
}

export default function CollectionPage({ params }: TicketPageProps) {
  const { id } = params;

  const ticketId = id; // "a0790b0b-66b1-4e31-8e21-fbbbb3bf7f3a"
  const { data, isSuccess } = useReadTicketMasterGetTicketMetadata({
    address: CONTRACT_ADDRESS,
    args: [
      ticketId
    ]
  })

  const metadata: TicketMetadata = convertOnChainToTicketMetadata(data as any)

  const renderLoading = () => (
    <div className="text-white h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <p>loading...</p>
    </div>
  )

  const renderTicket = () => (
    <Row
      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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

// export default TicketPage
