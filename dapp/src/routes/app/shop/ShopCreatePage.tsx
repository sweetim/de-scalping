import { TicketMetadata } from "@/contract"
import {
  PrimaryButton,
  PublishTicketMetadata,
  StepperEditForm,
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import EditTicketMetadataCard, { EditTicketMetadataForm } from "@/modules/EditTicketMetadataCard"
import EditTicketPriceTable, { EditTicketPriceItem } from "@/modules/EditTicketPriceTable"

import {
  Avatar,
  Col,
  Row,
  Space,
} from "antd"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const steps = [
  {
    title: "Title",
  },
  {
    title: "Tickets",
  },
  {
    title: "Preview",
  },
  {
    title: "Publish",
  },
]

export default function ShopCreatePage() {
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
    const [ startDate, endDate ] = data.dates.map(item => BigInt((new Date(item)).getTime()))

    setTicketMetadata(prev => ({
      ...prev,
      name: data.title,
      description: data.description,
      uri: data.images,
      dates: [ startDate, endDate ],
      location: {
        name: "Tokyo Dome, Tokyo",
        uri: `http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`,
      },
    }))
  }

  function editTicketPriceTableHandler(_data: EditTicketPriceItem[]) {
    // setTicketMetadata(prev => ({
    //   ...prev,
    //   pricing: data.map(item => ({
    //     name: item.name,
    //     description: item.description,
    //     price: BigInt(item.price),
    //     tickets: BigInt(item.tickets),
    //   })),
    // }))
  }

  const renderEditTicketDescription = () => <EditTicketMetadataCard onChange={editTicketMetadataHandler} />

  const [ supportedStableCoin, setSupportedStableCoin ] = useState([
    {
      selected: false,
      title: "USDT",
      icon: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
    },
    {
      selected: false,
      title: "USDC",
      icon:
        "data:image/png;base64,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",
    },
    {
      selected: false,
      title: "JPYC",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
    },
  ])

  const renderEditTicketPricing = () => {
    function stableCoinClickHandler(index: number) {
      setSupportedStableCoin(prev =>
        prev.map((item, i) => {
          return {
            ...item,
            selected: index === i,
          }
        })
      )
    }

    const priceUnit = supportedStableCoin.filter(item => item.selected).length > 0
      ? supportedStableCoin.filter(item => item.selected)[0].title
      : ""

    return (
      <Space direction="vertical" className="w-1/2">
        <div className="bg-white p-3 rounded-md">
          <h1 className="font-medium">Select stable coin used to receive payment for ticket purchase</h1>
          <Space className="pt-3">
            {supportedStableCoin.map((item, index) => (
              <PrimaryButton
                selected={item.selected}
                key={item.title}
                icon={<Avatar src={item.icon} />}
                onClick={() => stableCoinClickHandler(index)}
              >
                {item.title}
              </PrimaryButton>
            ))}
          </Space>
        </div>
        <EditTicketPriceTable
          priceUnit={priceUnit}
          onChange={editTicketPriceTableHandler}
        />
      </Space>
    )
  }

  const renderPreviewTicketMetadata = () => (
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
    // const id = uuidv4()
    // const DEFAULT_TICKET: TicketMetadata = {
    //   id,
    //   name: "Coldplay Concert Tokyo 2023",
    //   description:
    //     "Experience the magic of Coldplay live in Tokyo and sing along to all your favorite Coldplay hits, from Yellow to Viva La Vida",
    //   uri:
    //     "https://www.billboard.com/wp-content/uploads/2022/05/coldplay-2022-credit-stevie-rae-gibbs-press-billboard-1548.jpg",

    //   location: {
    //     name: "Tokyo Dome, Japan",
    //     uri: "https://maps.app.goo.gl/VftKxYjWcWr9Sxfr7",
    //   },
    //   dates: [
    //     BigInt((new Date("2023-06-20")).getTime()),
    //     BigInt((new Date("2023-06-22")).getTime()),
    //   ],
    //   pricing: [
    //     {
    //       name: "Gold",
    //       description: "exclusive merchandise and a dedicated entrance",
    //       price: BigInt(500),
    //       tickets: BigInt(50),
    //     },
    //     {
    //       name: "Balcony",
    //       description: "secure your spot for a great view of the stage",
    //       price: BigInt(250),
    //       tickets: BigInt(200),
    //     },
    //     {
    //       name: "S",
    //       description: "this section offers a fantastic view of the performance",
    //       price: BigInt(200),
    //       tickets: BigInt(1000),
    //     },
    //     {
    //       name: "A",
    //       description: "affordable option provides a great concert experience",
    //       price: BigInt(160),
    //       tickets: BigInt(5000),
    //     },
    //   ],
    // }
    return <PublishTicketMetadata ticketMetadata={ticketMetadata} />
  }

  return (
    <div className="mt-10">
      <StepperEditForm steps={steps.map(item => item.title)}>
        {renderEditTicketDescription()}
        {renderEditTicketPricing()}
        {renderPreviewTicketMetadata()}
        {renderPublishTicketMetadata()}
      </StepperEditForm>
    </div>
  )
}

// 35.705735405562066, 139.7519020251974
