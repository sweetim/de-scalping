import { Col, Flex, Row } from "antd"
import { FC } from "react"

import { TicketMetadata } from "@/contract"
type TicketMetadataProps =   {
  metadata: TicketMetadata
}

const TicketMetadataCard: FC<TicketMetadataProps> = ({ metadata }) => {
  return (
    <Row
      className="h-full">
      <Col sm={{ flex: "auto" }}>
        <Flex className="w-full h-full"
          align="center"
          vertical>
          <div className="bg-white p-5 m-5 rounded-2xl max-w-xl">
            <Flex justify="space-between">
              <h1 className="text-2xl font-bold">{metadata.title}</h1>
              <div className="bg-purple-300 max-w-fit p-2 font-bold rounded-full">
                <p>{metadata.availableTickets}</p>
              </div>
            </Flex>
            <p className="text-gray-500 text-base">November 6 - 7, 2023 | <a target="_blank" href={metadata.location.uri}>{metadata.location.name}</a></p>
            <img
              className="rounded-xl my-2"
              src={metadata.uri}
              alt="ticket-image" />
            <section className="text-gray-500">{metadata.description}</section>
          </div>
        </Flex>
      </Col>
    </Row>
  )
}

export default TicketMetadataCard
