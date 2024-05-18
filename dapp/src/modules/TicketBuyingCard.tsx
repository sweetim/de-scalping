"use client"

import { CONTRACT_ADDRESS, TicketPricing } from "@/contract";
import { Button, Flex, Select } from "antd";
import { FC, useState } from "react";
import { useWriteTicketMasterBuyTicket } from "@/generated"

export type TicketBuyingCardProps = {
  id: string,
  pricing: TicketPricing[]
}

const TicketBuyingCard: FC<TicketBuyingCardProps> = ({ pricing, id }) => {
  const [selectedTicketPricing, setSelectedTicketPricing] = useState("")
  const { writeContractAsync } = useWriteTicketMasterBuyTicket()

  async function buyClickHandler() {
    console.log(selectedTicketPricing)
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      args: [
        id,
        selectedTicketPricing
      ]
    })
  }

  const selectedTicketPrice = pricing
    .filter(p => p.name === selectedTicketPricing)
    .map(p => p.amount)[0] || 0

  return (
    <Flex vertical className="w-full h-full m-3 bg-white p-3 max-w-[530px]">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <Flex justify="space-between" align="center" >
        <Flex
          className="p-2"
          align="center">
          <p className="text-gray-500 text-base mr-5">Ticket</p>
          <Select
            className="w-60"
            size="large"
            onSelect={(item) => setSelectedTicketPricing(item)}
            options={pricing.map(item => ({
              value: item.name,
              label: item.name
            }))}
          />
        </Flex>
        <h2 className="text-xl font-bold">{`${selectedTicketPrice} USDC`}</h2>
      </Flex>
      <Flex justify="center" align="center" className="mt-5" >
        <Button type="primary"
          size="large"
          className="!px-16 !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={buyClickHandler}>BUY</Button>
      </Flex>
    </Flex>
  )
}

export default TicketBuyingCard
