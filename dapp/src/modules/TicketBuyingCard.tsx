"use client"

import { TicketPageParams } from "@/app/(zksync)/ticket/[address]/page"
import {
  JPYC_ADDRESS,
  TicketPricing,
} from "@/contract"
import {
  jpycAbi,
  ticketShopAbi,
  useReadJpycAllowance,
  useReadJpycBalanceOf,
  useReadTicketShopGetShopPaymasterAddress,
} from "@/generated"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
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
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import { eip712WalletActions } from "viem/zksync"
import { useAccount } from "wagmi"
import { utils } from "zksync-ethers"

export type TicketBuyingCardProps = {
  pricing: readonly TicketPricing[]
}

const TicketBuyingCard: FC<TicketBuyingCardProps> = ({ pricing }) => {
  const { address: ticketShopAddress } = useParams<TicketPageParams>()
  const { address } = useAccount()
  const {
    provider,
  } = useWeb3Auth()

  const { data: shopPaymasterAddress } = useReadTicketShopGetShopPaymasterAddress(
    {
      address: ticketShopAddress,
    },
  )

  const { data: allowance } = useReadJpycAllowance({
    address: JPYC_ADDRESS,
    args: [
      address!,
      ticketShopAddress,
    ],
  })

  const { data: jpycBalance } = useReadJpycBalanceOf({
    address: JPYC_ADDRESS,
    args: [
      address!,
    ],
  })
  console.log(jpycBalance)

  const [ selectedTicketType, setSelectedTicketType ] = useState("")

  async function buyClickHandler() {
    if (!provider) return
    if (!shopPaymasterAddress) return
    if (!ticketShopAddress) return

    console.log(allowance)

    // const privateKey = await provider.request({
    //   method: "eth_private_key",
    // })
    // console.log("here", privateKey)

    const publicClient = createPublicClient({
      chain: zkSyncInMemoryNode,
      transport: http(),
    })

    const walletClient = createWalletClient({
      chain: zkSyncInMemoryNode,
      transport: custom<IProvider>(provider),
    }).extend(eip712WalletActions())

    const [ address ] = await walletClient.getAddresses()

    const paymasterParams = utils.getPaymasterParams(
      shopPaymasterAddress,
      {
        type: "ApprovalBased",
        token: JPYC_ADDRESS,
        minimalAllowance: BigInt(1),
        innerInput: new Uint8Array(),
      },
    )

    const gasApprove = await publicClient.estimateContractGas({
      account: address,
      abi: jpycAbi,
      address: JPYC_ADDRESS,
      functionName: "approve",
      args: [
        ticketShopAddress,
        BigInt(1_000),
      ],
    })
    console.log(gasApprove, address)
    // await publicClient.waitForTransactionReceipt({
    //   hash: await walletClient.writeContract({
    //     account: address,
    //     abi: jpycAbi,
    //     address: JPYC_ADDRESS,
    //     functionName: "approve",
    //     args: [
    //       ticketShopAddress,
    //       BigInt(1_000),
    //     ],
    //     // gas: BigInt(100_000),
    //     gasPerPubdata: BigInt(utils.DEFAULT_GAS_PER_PUBDATA_LIMIT),
    //     maxFeePerGas: BigInt(25_000_000_000),
    //     paymaster: paymasterParams.paymaster as `0x${string}`,
    //     paymasterInput: paymasterParams.paymasterInput as `0x${string}`,
    //   }),
    // })

    console.log("done")
    console.log("start estimate", ticketShopAddress)
    const gasBuyTicket = await publicClient.estimateContractGas({
      account: address,
      abi: ticketShopAbi,
      address: ticketShopAddress,
      functionName: "buyTicket",
      args: [
        BigInt(0),
      ],
    })

    console.log(formatEther(gasBuyTicket))
    const txBuyTicket = await walletClient.writeContract({
      account: address,
      abi: ticketShopAbi,
      address: ticketShopAddress,
      functionName: "buyTicket",
      args: [
        BigInt(0),
      ],
      // gas: gasBuyTicket,
      gasPerPubdata: BigInt(utils.DEFAULT_GAS_PER_PUBDATA_LIMIT),
      maxFeePerGas: BigInt(25_000_000_000),
      maxPriorityFeePerGas: BigInt(25_000_000_000),
      paymaster: paymasterParams.paymaster as `0x${string}`,
      paymasterInput: paymasterParams.paymasterInput as `0x${string}`,
    })
    console.log("done")
    await publicClient.waitForTransactionReceipt({
      hash: txBuyTicket,
    })
    console.log("finish")
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
