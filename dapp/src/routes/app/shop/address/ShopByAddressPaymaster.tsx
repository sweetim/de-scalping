import {
  useReadJpycBalanceOf,
  useReadTicketShopGetShopPaymasterAddress,
} from "@/generated"

import { ShopByAddressPageParams } from "@/config/router"
import { JPYC_ADDRESS } from "@/contract"
import { PrimaryButton } from "@/modules"
import {
  Space,
  Statistic,
} from "antd"
import {
  useEffect,
  useState,
} from "react"
import { useLoaderData } from "react-router-dom"
import { formatEther } from "viem/utils"
import { usePublicClient } from "wagmi"

const ShopByAddressPaymaster = () => {
  const { ticketShopAddress } = useLoaderData() as ShopByAddressPageParams

  const { data: shopPaymasterAddress } = useReadTicketShopGetShopPaymasterAddress({
    address: ticketShopAddress,
  })

  const { data: shopPaymasterBalance_jpyc } = useReadJpycBalanceOf({
    address: JPYC_ADDRESS,
    args: [
      shopPaymasterAddress!,
    ],
  })

  const publicClient = usePublicClient()

  const [ paymasterBalance, setPaymasterBalance ] = useState(0n)

  useEffect(() => {
    ;(async () => {
      if (!publicClient) return
      if (!shopPaymasterAddress) return

      setPaymasterBalance(
        await publicClient.getBalance({
          address: shopPaymasterAddress,
        }),
      )
    })()
  }, [ shopPaymasterAddress, publicClient ])

  return (
    <div>
      <Space className="p-3 px-5 m-3 rounded-xl" direction="vertical">
        <Statistic
          title="address"
          value={shopPaymasterAddress}
        />
        <div className="flex flex-row justify-between">
          <Statistic
            title="balance (ETH)"
            value={formatEther(paymasterBalance)}
            precision={5}
          />
          <Space>
            <PrimaryButton dark>Deposit</PrimaryButton>
            <PrimaryButton dark>Withdraw</PrimaryButton>
          </Space>
        </div>
        <div className="flex flex-row justify-between">
          <Statistic
            title="balance (JPYC)"
            value={Number(shopPaymasterBalance_jpyc) || 0}
          />
          <Space>
            <PrimaryButton dark>Withdraw</PrimaryButton>
          </Space>
        </div>
      </Space>
    </div>
  )
}

export default ShopByAddressPaymaster
