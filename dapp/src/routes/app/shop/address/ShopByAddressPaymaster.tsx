import {
  useReadJpycBalanceOf,
  useReadTicketShopGetShopPaymasterAddress,
} from "@/generated"

import { ShopByAddressPageParams } from "@/config/router"
import { JPYC_ADDRESS } from "@/contract"
import { PrimaryButton } from "@/modules"
import {
  Avatar,
  List,
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

  const balanceList = [
    {
      title: "ETH",
      value: formatEther(paymasterBalance),
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
      deposit: true,
    },
    {
      title: "JPYC",
      value: Number(shopPaymasterBalance_jpyc) || 0,
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
      deposit: false,
    },
  ]

  return (
    <div>
      <Space className="p-3 px-5 m-3 rounded-xl" direction="vertical">
        <Statistic
          title="address"
          value={shopPaymasterAddress}
        />
        <h1 className="text-xl">Balance</h1>
        <List
          dataSource={balanceList}
          renderItem={(item) => (
            <List.Item
              actions={[
                item.deposit && <PrimaryButton dark>Deposit</PrimaryButton>,
                <PrimaryButton dark>Withdraw</PrimaryButton>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={item.title}
                description={item.value}
              />
            </List.Item>
          )}
        />
      </Space>
    </div>
  )
}

export default ShopByAddressPaymaster
