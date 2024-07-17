import { ShopByAddressPageParams } from "@/config/router"
import { JPYC_ADDRESS } from "@/contract"
import {
  useReadJpycBalanceOf,
  useReadTicketShopGetTicketMetadata,
} from "@/generated"
import { PrimaryButton } from "@/modules"
import {
  Space,
  Statistic,
} from "antd"
import { useLoaderData } from "react-router-dom"

const ShopByAddressOverview = () => {
  const { ticketShopAddress } = useLoaderData() as ShopByAddressPageParams

  const { data: ticketShopBalance_jpyc } = useReadJpycBalanceOf({
    address: JPYC_ADDRESS,
    args: [
      ticketShopAddress!,
    ],
  })

  const { data: ticketMetadata } = useReadTicketShopGetTicketMetadata({
    address: ticketShopAddress,
  })

  const ticketsSold = ticketMetadata?.pricing.reduce(
    (acc, item) => acc + Number(item.soldTickets),
    0,
  )

  const totalTickets = ticketMetadata?.pricing.reduce(
    (acc, item) => acc + Number(item.totalTickets),
    0,
  )

  return (
    <div>
      <Space className="p-3 px-5 m-3 rounded-xl" direction="vertical">
        <Statistic
          title="address"
          value={ticketShopAddress}
        />
        <div className="flex flex-row justify-between">
          <Statistic
            title="balance (JPYC)"
            value={Number(ticketShopBalance_jpyc) || 0}
          />
          <Space>
            <PrimaryButton dark>Withdraw</PrimaryButton>
          </Space>
        </div>
        <Statistic
          title="total tickets"
          value={Number(totalTickets) ?? "Unknown"}
        />
        <Statistic
          title="tickets sold"
          value={Number(ticketsSold) ?? "Unknown"}
        />
      </Space>
    </div>
  )
}

export default ShopByAddressOverview
