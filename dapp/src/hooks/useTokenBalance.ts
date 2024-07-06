import {
  useReadJpycBalanceOf,
  useReadUsdtBalanceOf,
} from "@/generated"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createPublicClient,
  http,
} from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import { useAccount } from "wagmi"

export function useTokenBalance() {
  const [ joctBalance, setJoctBalance ] = useState(0)
  const { address: walletAddress } = useAccount()

  const { data: jpycBalance, isSuccess: isSuccessJpyc, refetch: refetchJpyc } = useReadJpycBalanceOf({
    address: import.meta.env.VITE_JPYC_ADDRESS,
    args: [ walletAddress! ],
  })

  const { data: usdtBalance, isSuccess: isSuccessUsdt, refetch: refetchUsdt } = useReadUsdtBalanceOf({
    address: import.meta.env.VITE_USDT_ADDRESS,
    args: [ walletAddress! ],
  })

  useEffect(() => {
    ;(async () => {
      if (!walletAddress) return

      const publicClient = createPublicClient({
        chain: zkSyncInMemoryNode,
        transport: http(),
      })

      const balance = await publicClient.getBalance({
        address: walletAddress,
      })

      setJoctBalance(Number(balance))
    })()
  }, [ walletAddress ])

  const tokensData = useMemo(() => {
    return [
      {
        title: "USDT",
        amount: usdtBalance,
        icon: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
      },
      {
        title: "JPYC",
        amount: jpycBalance,
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
      },
    ]
  }, [ usdtBalance, jpycBalance, joctBalance ])

  const isSuccess = isSuccessJpyc && isSuccessUsdt

  return {
    isSuccess,
    usdtBalance,
    jpycBalance,
    refetchJpyc,
    refetchUsdt,
    tokensData,
    walletAddress,
  }
}
