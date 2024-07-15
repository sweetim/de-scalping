import TICKET_SHOP_QUERY from "@/graphql/queries/ticketShop"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { useQuery } from "@apollo/client"
import {
  Menu,
  MenuProps,
} from "antd"

import { FC } from "react"

type MenuItem = Required<MenuProps>["items"][number]

const ShopHomePage: FC = () => {
  const { walletAddress } = useWalletInfo()

  const { data, loading, error } = useQuery(TICKET_SHOP_QUERY, {
    variables: {
      id: walletAddress,
    },
  })

  const items: MenuItem[] = [
    {
      key: "sub1",
      label: "Navigation One",
      children: [
        {
          key: "g1",
          label: "Item 1",
          type: "group",
          children: [
            { key: "1", label: "Option 1" },
            { key: "2", label: "Option 2" },
          ],
        },
        {
          key: "g2",
          label: "Item 2",
          type: "group",
          children: [
            { key: "3", label: "Option 3" },
            { key: "4", label: "Option 4" },
          ],
        },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
          ],
        },
      ],
    },
  ]

  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[ "1" ]}
      defaultOpenKeys={[ "sub1" ]}
      mode="inline"
      items={items}
    />
  )
}

export default ShopHomePage
