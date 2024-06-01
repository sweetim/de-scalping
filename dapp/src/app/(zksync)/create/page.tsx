"use client"

import {
  TicketMetadata,
  TicketPricing,
} from "@/contract"
import {
  CenterDiv,
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import EditTicketMetadataCard, { EditTicketMetadataForm } from "@/modules/EditTicketMetadataCard"
import EditTicketPricingCard, { EditTicketPriceForm } from "@/modules/EditTicketPricingCard"
import PublishTicketMetadata from "@/modules/PublishTicketMetadata"
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import {
  Button,
  Col,
  Row,
  Steps,
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

const items = steps.map((item) => ({ key: item.title, title: item.title }))

export default function CreatePage() {
  const [ currentStep, setCurrentStep ] = useState(0)

  const [ ticketMetadata, setTicketMetadata ] = useState<TicketMetadata>({
    id: uuidv4(),
    title: "",
    description: "",
    uri: "",
    dates: [],
    location: {
      name: "",
      uri: "",
    },
    pricing: [],
  })

  function previousClickHandler() {
    setCurrentStep(step => step - 1)
  }

  function nextClickHandler() {
    setCurrentStep(step => step + 1)
  }

  function editTicketMetadataHandler(data: EditTicketMetadataForm) {
    const [ lat, lng ] = data.location

    setTicketMetadata(prev => ({
      ...prev,
      title: data.title,
      description: data.description,
      uri: data.images,
      dates: data.dates,
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
      title: "Coldplay Concert Tokyo 2023",
      description:
        "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
      uri:
        "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",

      location: {
        name: "Tokyo Dome, Japan",
        uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
      },
      dates: [
        "2023-06-20",
        "2023-06-22",
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
    return <PublishTicketMetadata ticketMetadata={DEFAULT_TICKET} />
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderEditTicketMetadata()
      case 1:
        return renderViewTicketMetadata()
      case 2:
        return renderPublishTicketMetadata()
      default:
        return renderEditTicketMetadata()
    }
  }

  return (
    <CenterDiv>
      <Row className="w-full">
        <Col span={12} offset={6}>
          <div className="flex flex-row justify-between">
            {currentStep > 0
              ? (
                <Button
                  className="!bg-purple-300 !text-black"
                  hidden={currentStep > 0}
                  type="primary"
                  icon={<LeftOutlined />}
                  onClick={previousClickHandler}
                >
                  Previous
                </Button>
              )
              : null}
            <Steps className="!px-8" current={currentStep} items={items} />
            {steps.length > currentStep + 1
              ? (
                <Button
                  className="!bg-purple-300 !text-black"
                  type="primary"
                  iconPosition="end"
                  icon={<RightOutlined />}
                  onClick={nextClickHandler}
                >
                  Next
                </Button>
              )
              : null}
          </div>
        </Col>
      </Row>

      {renderStepContent()}
    </CenterDiv>
  )
}

// 35.705735405562066, 139.7519020251974
