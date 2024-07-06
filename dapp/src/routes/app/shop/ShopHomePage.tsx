import { TicketMetadata } from "@/contract"
import {
  useReadTicketShopGetNftAddress,
  useReadTicketShopGetShopPaymasterAddress,
  useReadTicketShopGetTicketMetadata,
} from "@/generated"
import {
  TicketMetadataCard,
  TicketPricingCard,
} from "@/modules"
import PrimaryButton from "@/modules/ui/PrimaryButton"
import {
  Col,
  Flex,
  Row,
  Space,
  Statistic,
} from "antd"
import {
  FC,
  useEffect,
  useState,
} from "react"
import { formatEther } from "viem"
import { usePublicClient } from "wagmi"

const ShopHomePage: FC = () => {
  const ticketShopAddress: `0x${string}` = "0x19522C1Bfa536779Ea783B05a255F62E0972cC76"

  const [ paymasterBalance, setPaymasterBalance ] = useState(0n)

  const { data: shopPaymasterAddress } = useReadTicketShopGetShopPaymasterAddress(
    {
      address: ticketShopAddress,
    },
  )

  const { data: nftAddress } = useReadTicketShopGetNftAddress({
    address: ticketShopAddress,
  })

  const { data: ticketMetadata } = useReadTicketShopGetTicketMetadata({
    address: ticketShopAddress,
  })

  const metadata = ticketMetadata as TicketMetadata

  const publicClient = usePublicClient()

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
    <>
      <Row>
        <Col span={12}>
          <Flex align="end" vertical>
            <Space className="bg-white p-3 px-5 m-3 rounded-xl" direction="vertical">
              <h1 className="text-xl capitalize font-bold">Shop paymaster</h1>
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
                  <PrimaryButton>Withdraw</PrimaryButton>
                  <PrimaryButton>Deposit</PrimaryButton>
                </Space>
              </div>
            </Space>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex align="start" vertical>
            <Space className="bg-white p-3 px-5 m-3 rounded-xl" direction="vertical">
              <h1 className="text-xl capitalize font-bold">NFT</h1>
              <Statistic
                title="address"
                value={nftAddress}
              />
            </Space>
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={12} sm={{ flex: "auto" }}>
          <Row>
            <Col span={24}>
              <TicketMetadataCard metadata={metadata} />
            </Col>
          </Row>
        </Col>
        <Col span={12} className="overflow-auto h-full no-scrollbar">
          <Row>
            {metadata.pricing.map(
              item => (
                <TicketPricingCard
                  key={item.name}
                  pricing={item}
                />
              ),
            )}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default ShopHomePage
