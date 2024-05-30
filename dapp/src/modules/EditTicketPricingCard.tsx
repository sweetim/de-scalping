"use client"

import {
  Input,
  InputNumber,
  Space,
} from "antd"
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from "react"

const { TextArea } = Input

type EditTicketPricingCardProps = {
  onChange: (data: EditTicketPriceForm) => void
}

export type EditTicketPriceForm = {
  name: string
  tickets: number
  description: string
  price: number
}

const EditTicketPricingCard: FC<EditTicketPricingCardProps> = ({ onChange }) => {
  const [ data, setData ] = useState<EditTicketPriceForm>({
    description: "",
    name: "",
    price: 0,
    tickets: 0,
  })

  useEffect(() => {
    onChange(data)
  }, [ data ])

  function nameInputHandler(ev: ChangeEvent<HTMLInputElement>) {
    setData(prev => ({
      ...prev,
      name: ev.target.value,
    }))
  }

  function ticketNumberInputHandler(value: number | string | null) {
    setData(prev => ({
      ...prev,
      tickets: Number(value),
    }))
  }

  function descriptionInputHandler(ev: ChangeEvent<HTMLTextAreaElement>) {
    setData(prev => ({
      ...prev,
      description: ev.target.value,
    }))
  }

  function ticketPriceInputHandler(value: number | string | null) {
    setData(prev => ({
      ...prev,
      price: Number(value),
    }))
  }

  return (
    <div className="bg-white rounded-lg p-3 min-w-64 max-w-64 m-3">
      <Space className="w-full" direction="vertical" size="middle">
        <Space className="w-full" direction="vertical" size="small">
          <h2>Ticket name</h2>
          <Input onChange={nameInputHandler} className="font-bold" placeholder="Ticket name" />
        </Space>
        <Space className="w-full" direction="vertical" size="small">
          <h2>Tickets</h2>
          <InputNumber min={1} onChange={ticketNumberInputHandler} />
        </Space>
        <Space className="w-full" direction="vertical" size="small">
          <h2>Description</h2>
          <TextArea onChange={descriptionInputHandler} rows={3} />
        </Space>
        <Space className="w-full" direction="vertical" size="small">
          <h2>Price</h2>
          <Space>
            <InputNumber min={1} onChange={ticketPriceInputHandler} />
            <p>{`USDC`}</p>
          </Space>
        </Space>
      </Space>
    </div>
  )
}

export default EditTicketPricingCard
