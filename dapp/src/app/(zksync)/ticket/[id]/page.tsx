"use client"

import {
  Col,
  Row,
} from "antd"
import {
  CONTRACT_ADDRESS,
  convertOnChainToTicketMetadata,
  TicketMetadata,
} from "@/contract"
import {
  CenterDiv,
  LoadingGif,
  TicketBuyingCard,
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import {
  ticketMasterAbi,
  useReadTicketMasterGetTicketMetadata,
  useWriteTicketMasterBuyTicket,
} from "@/generated"
import { zkSyncSepoliaTestnet } from "viem/zksync"

export type TicketPageProps = {
  params: {
    id: string
  }
}

export default function CollectionPage({ params }: TicketPageProps) {
  const { id } = params
  const ticketId = id // "a0790b0b-66b1-4e31-8e21-fbbbb3bf7f3a"
  const { data, isSuccess, status, error } = useReadTicketMasterGetTicketMetadata({
    address: CONTRACT_ADDRESS,
    chainId: zkSyncSepoliaTestnet.id,
    args: [
      ticketId,
    ],
  })

  const metadata: TicketMetadata = convertOnChainToTicketMetadata(data as any)

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
