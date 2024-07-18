import {
  Col,
  Flex,
  Row,
} from "antd"
import { FC } from "react"

import { TicketMetadataOnChain } from "@/contract"

type TicketMetadataProps = {
  metadata: TicketMetadataOnChain
}

const TicketMetadataCard: FC<TicketMetadataProps> = ({ metadata }) => {
  return (
    <Row>
      <Col sm={{ flex: "auto" }}>
        <Flex align="end" vertical>
          <div className="bg-white/80 p-3 sm:p-5 m-3 rounded-xl max-w-xl">
            <Flex justify="space-between">
              <h1 className="text-2xl font-bold">{metadata.name}</h1>
            </Flex>
            <p className="text-gray-500 text-base">
              November 6 - 7, 2023 | <a target="_blank" href={metadata.location.uri}>{metadata.location.name}</a>
            </p>
            <img
              className="rounded-xl my-2 w-full"
              src={metadata.uri}
              alt="ticket-image"
            />
            <section className="text-gray-600">{metadata.description}</section>
          </div>
        </Flex>
      </Col>
    </Row>
  )
}

export default TicketMetadataCard
