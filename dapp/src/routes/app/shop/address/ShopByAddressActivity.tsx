import { ShopByAddressPageParams } from "@/config"
import { TICKET_ACTIVITY_QUERY } from "@/graphql/queries/ticketShop"
import { presetPalettes } from "@ant-design/colors"
import { useQuery } from "@apollo/client"
import {
  List,
  Space,
  Tag,
} from "antd"
import { formatDistanceToNow } from "date-fns"
import { useLoaderData } from "react-router-dom"

const ShopByAddressActivity = () => {
  const { ticketShopAddress } = useLoaderData() as ShopByAddressPageParams

  const { data: tickets } = useQuery(
    TICKET_ACTIVITY_QUERY,
    {
      variables: {
        ticketShop: ticketShopAddress,
      },
      fetchPolicy: "no-cache",
    },
  )

  const tagColor = (index: number) => {
    const palettesKey = Object.keys(presetPalettes)
    return presetPalettes[palettesKey[index % palettesKey.length]].primary
  }

  return (
    <div className="p-2 px-5 w-full">
      <List
        header={<strong>Transaction history</strong>}
        itemLayout="horizontal"
        dataSource={tickets?.tickets}
        renderItem={item => (
          <List.Item
            actions={[
              <p className="text-base">
                <strong className="text-black">{Number(item.ticketPrice).toLocaleString()}</strong> JPYC
              </p>,
            ]}
          >
            <List.Item.Meta
              title={
                <a target="__blank" href={`https://sepolia.explorer.zksync.io/tx/${item.transactionHash}`}>
                  {item.owner}
                </a>
              }
              description={
                <Space>
                  <Tag color={tagColor(item.ticketTypeIndex)}>
                    {item.ticketName}
                  </Tag>
                  <p>
                    {formatDistanceToNow(
                      new Date(item.timestamp_s * 1000),
                      { addSuffix: true },
                    )}
                  </p>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default ShopByAddressActivity
