import {
  CHAIN_TO_USE,
  JPYC_ADDRESS,
  TICKET_ERC20_ADDRESS,
  USDT_ADDRESS,
} from "@/contract"
import {
  useReadJpycBalanceOf,
  useReadTicketErc20BalanceOf,
  useReadUsdtBalanceOf,
} from "@/generated"

import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createWalletClient,
  custom,
} from "viem"
import { useBalance } from "wagmi"

export function useWalletInfo() {
  const [ walletAddress, setWalletAddress ] = useState<`0x${string}` | null>(null)

  const {
    userInfo,
    provider,
  } = useWeb3Auth()

  const { data: balance_eth } = useBalance({
    address: walletAddress!,
  })

  useEffect(() => {
    ;(async () => {
      if (!provider) return

      const walletClient = createWalletClient({
        chain: CHAIN_TO_USE,
        transport: custom<IProvider>(provider),
      })

      const [ address ] = await walletClient.getAddresses()
      setWalletAddress(address)
    })()
  }, [ provider ])

  const { data: balance_jpyc, isSuccess: isSuccessJpyc, refetch: refetch_jpyc } = useReadJpycBalanceOf({
    address: JPYC_ADDRESS,
    args: [ walletAddress! ],
  })

  const { data: balance_usdt, isSuccess: isSuccessUsdt, refetch: refetch_usdt } = useReadUsdtBalanceOf({
    address: USDT_ADDRESS,
    args: [ walletAddress! ],
  })

  const { data: balance_ticketErc20, isSuccess: isSuccessticketErc20, refetch: refetch_ticketErc20 } =
    useReadTicketErc20BalanceOf({
      address: TICKET_ERC20_ADDRESS,
      args: [ walletAddress! ],
    })

  const tokensData = useMemo(() => {
    return [
      {
        title: "ETH",
        amount: balance_eth
          ? Number(balance_eth.value) / Math.pow(10, balance_eth.decimals)
          : 0,
        icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
      },
      {
        title: "USDT",
        amount: balance_usdt,
        icon: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
      },
      {
        title: "JPYC",
        amount: balance_jpyc,
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
      },
      {
        title: "Ticket",
        amount: balance_ticketErc20,
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
      },
    ]
  }, [ balance_usdt, balance_jpyc, balance_eth ])

  const isSuccess = isSuccessJpyc && isSuccessUsdt && isSuccessticketErc20

  return {
    isSuccess,
    userInfo,
    walletAddress,
    balance_eth,
    balance_ticketErc20,
    refetch_jpyc,
    refetch_usdt,
    refetch_ticketErc20,
    tokensData,
  }
}
