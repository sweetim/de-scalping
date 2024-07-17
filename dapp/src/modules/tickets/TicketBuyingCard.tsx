import {
  CHAIN_TO_USE,
  JPYC_ADDRESS,
  TicketPricing,
} from "@/contract"
import {
  jpycAbi,
  ticketShopAbi,
  useReadTicketShopGetShopPaymasterAddress,
} from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { TicketPageParams } from "@/routes/app/EventAddressPage"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Button,
  Flex,
  Select,
} from "antd"

import {
  FC,
  useState,
} from "react"
import { useParams } from "react-router-dom"
import {
  match,
  P,
} from "ts-pattern"
import {
  createWalletClient,
  custom,
} from "viem"
import { eip712WalletActions } from "viem/zksync"
import { usePublicClient } from "wagmi"
import { utils } from "zksync-ethers"

export type TicketBuyingCardProps = {
  pricing: readonly TicketPricing[]
}

const TicketBuyingCard: FC<TicketBuyingCardProps> = ({ pricing }) => {
  const { address: ticketShopAddress } = useParams<TicketPageParams>()

  const { walletAddress } = useWalletInfo()
  const { provider } = useWeb3Auth()
  const publicClient = usePublicClient()

  const { data: shopPaymasterAddress } = useReadTicketShopGetShopPaymasterAddress(
    {
      address: ticketShopAddress,
    },
  )

  const [ selectedTicketTypeIndex, setSelectedTicketTypeIndex ] = useState<number | null>(null)

  async function buyClickHandler() {
    if (!provider) return
    if (!shopPaymasterAddress) return
    if (!ticketShopAddress) return
    if (!selectedTicketPrice) return
    if (!selectedTicketTypeIndex) return
    if (!walletAddress) return
    if (!publicClient) return

    const walletClient = createWalletClient({
      chain: CHAIN_TO_USE,
      transport: custom<IProvider>(provider),
    }).extend(eip712WalletActions())

    const transactionCount = await publicClient.getTransactionCount({
      address: shopPaymasterAddress,
    })
    console.log({ transactionCount })

    const allowance = await publicClient.readContract({
      abi: jpycAbi,
      address: JPYC_ADDRESS,
      functionName: "allowance",
      args: [
        walletAddress,
        ticketShopAddress,
      ],
    })

    console.log("allowance", allowance)
    if (allowance < BigInt(selectedTicketPrice)) {
      const paymasterParams = utils.getPaymasterParams(
        shopPaymasterAddress,
        {
          type: "ApprovalBased",
          token: JPYC_ADDRESS,
          minimalAllowance: BigInt(1),
          innerInput: new Uint8Array(),
        },
      )

      await publicClient.waitForTransactionReceipt({
        hash: await walletClient.writeContract({
          account: walletAddress,
          abi: jpycAbi,
          address: JPYC_ADDRESS,
          functionName: "approve",
          args: [
            ticketShopAddress,
            BigInt(10_000),
          ],
          gasPerPubdata: BigInt(utils.DEFAULT_GAS_PER_PUBDATA_LIMIT),
          paymaster: paymasterParams.paymaster as `0x${string}`,
          paymasterInput: paymasterParams.paymasterInput as `0x${string}`,
        }),
      })
    }

    console.log("start estimate", ticketShopAddress)

    const paymasterParams = utils.getPaymasterParams(
      shopPaymasterAddress,
      {
        type: "ApprovalBased",
        token: JPYC_ADDRESS,
        minimalAllowance: BigInt(1),
        innerInput: new Uint8Array(),
      },
    )

    const nonce = await publicClient.getTransactionCount({
      address: walletAddress,
    })

    const txBuyTicket = await walletClient.writeContract({
      account: walletAddress,
      abi: ticketShopAbi,
      address: ticketShopAddress,
      functionName: "buyTicket",
      args: [
        BigInt(selectedTicketTypeIndex),
      ],
      nonce,
      gasPerPubdata: BigInt(utils.DEFAULT_GAS_PER_PUBDATA_LIMIT),
      paymaster: paymasterParams.paymaster as `0x${string}`,
      paymasterInput: paymasterParams.paymasterInput as `0x${string}`,
    })

    await publicClient.waitForTransactionReceipt({
      hash: txBuyTicket,
    })
  }

  const selectedTicketPrice = match(selectedTicketTypeIndex)
    .with(P.number, () => pricing[selectedTicketTypeIndex!].price)
    .otherwise(() => null)

  return (
    <Flex vertical className="w-full h-full bg-white/80 p-3 rounded-xl">
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
            onSelect={(item) => setSelectedTicketTypeIndex(item)}
            options={pricing.map((item, index) => ({
              value: index,
              label: item.name,
            }))}
          />
        </Flex>
        <h2 className="text-xl font-bold">{`${selectedTicketPrice?.toLocaleString() || 0} JPYC`}</h2>
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
