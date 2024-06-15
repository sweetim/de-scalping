"use client"

import { TicketPageParams } from "@/app/(zksync)/ticket/[address]/page"
import {
  JPYC_ADDRESS,
  TicketPricing,
} from "@/contract"
import {
  useReadTicketShopGetShopPaymasterAddress,
  useWriteJpycApprove,
} from "@/generated"
import {
  Button,
  Flex,
  Select,
} from "antd"
import { useParams } from "next/navigation"
import {
  FC,
  useState,
} from "react"
import {
  createWalletClient,
  custom,
} from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import { eip712WalletActions } from "viem/zksync"
import { useWalletClient } from "wagmi"

export type TicketBuyingCardProps = {
  pricing: readonly TicketPricing[]
}

const TicketBuyingCard: FC<TicketBuyingCardProps> = ({ pricing }) => {
  const { address } = useParams<TicketPageParams>()

  const { data: shopPaymasterAddress } = useReadTicketShopGetShopPaymasterAddress(
    {
      address,
    },
  )
  console.log(shopPaymasterAddress)
  const { writeContractAsync: jpycApprove, status } = useWriteJpycApprove()

  const { data: wc } = useWalletClient()

  const [ selectedTicketType, setSelectedTicketType ] = useState("")

  async function buyClickHandler() {
    // console.log("here")

    // const [ account ] = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // })
    // console.log(account)
    const walletClient = createWalletClient({
      account: wc?.account!,
      // account,
      chain: zkSyncInMemoryNode,
      transport: custom(window.ethereum),
    }).extend(eip712WalletActions())

    await jpycApprove({
      address: JPYC_ADDRESS,
      args: [
        address,
        BigInt(1_000),
      ],
    })

    // const tx = await walletClient.writeContract({
    //   account: wc?.account!,
    //   abi: usdtAbi,
    //   address: USDT_ADDRESS,
    //   functionName: "approve",
    //   args: [
    // address,
    // BigInt(1_000),
    //   ],
    // })

    // console.log(tx)

    // const paymasterParams = utils.getPaymasterParams(
    //   shopPaymasterAddress!,
    //   {
    //     type: "General",
    //     innerInput: new Uint8Array(),
    //   },
    // )
    // console.log(shopPaymasterAddress)
    // console.log("start")
    // const tx = await walletClient.writeContract({
    //   account,
    //   abi: ticketShopAbi,
    //   address,
    //   functionName: "buyTicket",
    //   args: [
    //     BigInt(0),
    //   ],
    //   maxPriorityFeePerGas: BigInt(1_000_000_000_000_000),
    //   paymaster: paymasterParams.paymaster as `0x${string}`,
    //   paymasterInput: paymasterParams.paymasterInput as `0x${string}`,
    // })
    // console.log(tx)
  }

  const selectedTicketPrice = pricing
    .filter(p => p.name === selectedTicketType)
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
            onSelect={(item) => setSelectedTicketType(item)}
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
