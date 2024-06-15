"use client"

import {
  SHOP_PAYMASTER_CONTRACT_ADDRESS,
  TICKET_ERC20_CONTRACT_ADDRESS,
  TICKET_SHOP_CONTRACT_ADDRESS,
  TicketPricing,
} from "@/contract"
import { ticketShopAbi } from "@/generated"
import {
  Button,
  Flex,
  Select,
} from "antd"
import {
  FC,
  useState,
} from "react"
import {
  createWalletClient,
  custom,
} from "viem"
import {
  eip712WalletActions,
  zkSyncSepoliaTestnet,
} from "viem/zksync"
import { useWalletClient } from "wagmi"
import { utils } from "zksync-ethers"

export type TicketBuyingCardProps = {
  id: string
  pricing: TicketPricing[]
}

const TicketBuyingCard: FC<TicketBuyingCardProps> = ({ pricing, id }) => {
  const { data: wc } = useWalletClient()
  const [ selectedTicketPricing, setSelectedTicketPricing ] = useState("")

  async function buyClickHandler() {
    const walletClient = createWalletClient({
      chain: zkSyncSepoliaTestnet,
      transport: custom(window.ethereum),
    }).extend(eip712WalletActions())

    const paymasterParams = utils.getPaymasterParams(
      SHOP_PAYMASTER_CONTRACT_ADDRESS,
      {
        type: "ApprovalBased",
        token: TICKET_ERC20_CONTRACT_ADDRESS,
        minimalAllowance: BigInt("1"),
        innerInput: new Uint8Array(),
      },
    )

    const tx = await walletClient.writeContract({
      account: wc?.account!,
      abi: ticketShopAbi,
      address: TICKET_SHOP_CONTRACT_ADDRESS,
      functionName: "buyTicket",
      args: [
        id,
        BigInt(0),
      ],
      paymaster: paymasterParams.paymaster as `0x${string}`,
      paymasterInput: paymasterParams.paymasterInput as `0x${string}`,
    })
    console.log(selectedTicketPricing)
  }

  const selectedTicketPrice = pricing
    .filter(p => p.name === selectedTicketPricing)
    .map(p => p.price)[0] || 0

  return (
    <Flex vertical className="w-full h-full m-3 bg-white p-3 max-w-[530px]">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <Flex justify="space-between" align="center">
        <Flex
          className="p-2"
          align="center"
        >
          <p className="text-gray-500 text-base mr-5">Ticket</p>
          <Select
            className="w-60"
            size="large"
            onSelect={(item) => setSelectedTicketPricing(item)}
            options={pricing.map(item => ({
              value: item.name,
              label: item.name,
            }))}
          />
        </Flex>
        <h2 className="text-xl font-bold">{`${selectedTicketPrice} USDC`}</h2>
      </Flex>
      <Flex justify="center" align="center" className="mt-5">
        <Button
          type="primary"
          size="large"
          className="!px-16 !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          onClick={buyClickHandler}
        >
          BUY
        </Button>
      </Flex>
    </Flex>
  )
}

export default TicketBuyingCard
