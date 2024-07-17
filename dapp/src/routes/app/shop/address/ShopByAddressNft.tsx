import { ShopByAddressPageParams } from "@/config/router"
import {
  useReadTicketNftGetAllBurner,
  useReadTicketShopGetNftAddress,
} from "@/generated"

import {
  Space,
  Statistic,
} from "antd"
import { useLoaderData } from "react-router-dom"

const ShopByAddressNft = () => {
  const { ticketShopAddress } = useLoaderData() as ShopByAddressPageParams

  const { data: ticketNftAddress } = useReadTicketShopGetNftAddress({
    address: ticketShopAddress,
  })

  const { data: ticketNftAllBurners } = useReadTicketNftGetAllBurner({
    address: ticketNftAddress,
  })

  return (
    <div>
      <Space className="p-3 px-5 m-3 rounded-xl" direction="vertical">
        <Statistic
          title="address"
          value={ticketNftAddress}
        />
        <Statistic
          title="burners"
          value={ticketNftAllBurners?.join(",")}
        />
      </Space>
    </div>
  )
}

export default ShopByAddressNft
