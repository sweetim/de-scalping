import { TICKET_SHOP_QUERY } from "@/graphql/queries/ticketShop"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { PrimaryButton } from "@/modules"
import { useQuery } from "@apollo/client"
import {
  PlusCircle,
  Storefront,
} from "@phosphor-icons/react"
import {
  ConfigProvider,
  Menu,
  MenuProps,
  Space,
  theme,
} from "antd"
import {
  FC,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom"

type MenuItem = Required<MenuProps>["items"][number]

const ShopRootPage: FC = () => {
  const { walletAddress } = useWalletInfo()
  const navigate = useNavigate()

  const { data: ticketShopAddresses } = useQuery(TICKET_SHOP_QUERY, {
    variables: {
      owner: walletAddress,
    },
    fetchPolicy: "no-cache",
  })

  const [ selectedMenuKeys, setSelectedMenuKeys ] = useState<string[]>([])

  const menuItems = useMemo(() => {
    if (!ticketShopAddresses) return []

    const ticketShopAddressMenuItem = ticketShopAddresses.ticketShops
      .map(item => item.ticketShop)
      .map(address => (
        {
          key: address,
          label: address,
          children: [
            { key: `${address}-overview`, label: <Link to={`address/${address}/overview`}>Overview</Link> },
            { key: `${address}-paymaster`, label: <Link to={`address/${address}/paymaster`}>Paymaster</Link> },
            { key: `${address}-nft`, label: <Link to={`address/${address}/nft`}>NFT</Link> },
          ],
        }
      ))

    const headerMenuItem: MenuItem = {
      key: "Shops",
      label: <Link to={`/app/shop`}>Shop</Link>,
      icon: <Storefront size={20} color="#fff" weight="duotone" />,
    }

    return [ headerMenuItem, ...ticketShopAddressMenuItem ]
  }, [ ticketShopAddresses ])

  useEffect(() => {
    const isTicketShopAddressesEmpty = ticketShopAddresses?.ticketShops.length === 0

    if (isTicketShopAddressesEmpty) {
      navigate("new")
    }
  }, [ ticketShopAddresses ])

  return (
    <div className="p-5 w-full h-full flex flex-row justify-center">
      <div className="flex flex-row rounded-xl p-3 container mx-auto">
        <div className="flex flex-col py-3">
          <Space direction="vertical">
            <Link to="new">
              <PrimaryButton
                icon={<PlusCircle size={32} color="#ccc" weight="fill" />}
                className="w-full"
                dark
              >
                Create
              </PrimaryButton>
            </Link>
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                components: {
                  Menu: {
                    itemBg: "#404040",
                    itemSelectedBg: "#52525b",
                    itemActiveBg: "#52525b",
                    itemDisabledColor: "#fff",
                    itemSelectedColor: "#fff",
                    itemColor: "#FFF",
                  },
                },
              }}
            >
              <Menu
                className="rounded-xl"
                style={{ width: 256 }}
                mode="inline"
                onOpenChange={(items) => setSelectedMenuKeys([ items.pop() || "" ])}
                openKeys={selectedMenuKeys}
                items={menuItems}
              />
            </ConfigProvider>
          </Space>
        </div>
        <div className="p-3 w-full h-full">
          <div className="bg-white/50 h-full w-full rounded-xl ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopRootPage
