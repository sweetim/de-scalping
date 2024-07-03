import {
  TicketMetadata,
  TicketPricing,
} from "@/contract"
import {
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import EditTicketMetadataCard, { EditTicketMetadataForm } from "@/modules/EditTicketMetadataCard"
import EditTicketPricingCard, { EditTicketPriceForm } from "@/modules/EditTicketPricingCard"
import PublishTicketMetadata from "@/modules/PublishTicketMetadata"
import StepperEditForm from "@/modules/StepperEditForm"
import {
  Col,
  Row,
} from "antd"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const steps = [
  {
    title: "Create",
  },
  {
    title: "Review",
  },
  {
    title: "Publish",
  },
]

export default function CreatePage() {
  const [ ticketMetadata, setTicketMetadata ] = useState<TicketMetadata>({
    id: uuidv4(),
    name: "",
    description: "",
    uri: "",
    dates: [
      BigInt(0),
      BigInt(0),
    ],
    location: {
      name: "",
      uri: "",
    },
    pricing: [],
  })

  function editTicketMetadataHandler(data: EditTicketMetadataForm) {
    const [ lat, lng ] = data.location
    console.log(data)
    setTicketMetadata(prev => ({
      ...prev,
      name: data.title,
      description: data.description,
      uri: data.images,
      dates: data.dates.map(item => BigInt((new Date(item)).getTime())),
      location: {
        name: "Tokyo Dome, Tokyo",
        uri: `http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`,
      },
    }))
  }

  function editTicketPricingHandler(index: number, data: EditTicketPriceForm) {
    setTicketMetadata(prev => {
      const { pricing } = prev

      const newPricing: TicketPricing = {
        name: data.name,
        description: data.description,
        price: BigInt(data.price),
        tickets: BigInt(data.tickets),
      }

      if (pricing[index]) {
        pricing[index] = newPricing
      } else {
        pricing.push(newPricing)
      }

      return {
        ...prev,
      }
    })
  }

  const renderEditTicketMetadata = () => (
    <Row>
      <Col span={12} sm={{ flex: "auto" }}>
        <EditTicketMetadataCard onChange={editTicketMetadataHandler} />
      </Col>
      <Col className="overflow-auto h-full">
        <Row>
          {Array(1).fill(0).map(
            (_, i) => (
              <EditTicketPricingCard
                key={i}
                onChange={(data) => editTicketPricingHandler(i, data)}
              />
            ),
          )}
        </Row>
      </Col>
    </Row>
  )

  const renderViewTicketMetadata = () => (
    <Row>
      <Col span={12} sm={{ flex: "auto" }}>
        <TicketMetadataCard metadata={ticketMetadata} />
      </Col>
      <Col className="overflow-auto h-full">
        <Row>
          {ticketMetadata.pricing.map(
            item => (
              <TicketPricingCard
                key={item.name}
                pricing={item}
              />
            ),
          )}
        </Row>
        <Row>
          {/* <TicketBuyingCard id={ticketId} pricing={metadata.pricing} /> */}
        </Row>
      </Col>
    </Row>
  )

  const renderPublishTicketMetadata = () => {
    const id = uuidv4()
    const DEFAULT_TICKET: TicketMetadata = {
      id,
      name: "Coldplay Concert Tokyo 2023",
      description:
        "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
      uri:
        "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",

      location: {
        name: "Tokyo Dome, Japan",
        uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
      },
      dates: [
        BigInt((new Date("2023-06-20")).getTime()),
        BigInt((new Date("2023-06-22")).getTime()),
      ],
      pricing: [
        {
          name: "Gold",
          description: "exclusive merchandise and a dedicated entrance",
          price: BigInt(500),
          tickets: BigInt(50),
        },
        {
          name: "Balcony",
          description: "secure your spot for a great view of the stage",
          price: BigInt(250),
          tickets: BigInt(200),
        },
        {
          name: "S",
          description: "this section offers a fantastic view of the performance",
          price: BigInt(200),
          tickets: BigInt(1000),
        },
        {
          name: "A",
          description: "affordable option provides a great concert experience",
          price: BigInt(160),
          tickets: BigInt(5000),
        },
      ],
    }
    return <PublishTicketMetadata ticketMetadata={ticketMetadata} />
  }

  return (
    <div className="mt-10">
      <StepperEditForm steps={steps.map(item => item.title)}>
        {renderEditTicketMetadata()}
        {renderViewTicketMetadata()}
        {renderPublishTicketMetadata()}
      </StepperEditForm>
    </div>
  )
}

// 35.705735405562066, 139.7519020251974
