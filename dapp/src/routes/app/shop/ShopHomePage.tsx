import {
  JPYC_ADDRESS,
  TicketMetadata,
} from "@/contract"
import {
  useReadJpycBalanceOf,
  useReadTicketNftGetAllBurner,
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
  const ticketShopAddress: `0x${string}` = "0xA33Cd7351093c25c95B77aDe6726dF49614F2B48"

  const [ paymasterBalance, setPaymasterBalance ] = useState(0n)

  const { data: shopPaymasterAddress } = useReadTicketShopGetShopPaymasterAddress(
    {
      address: ticketShopAddress,
    },
  )

  const { data: ticketNftAddress } = useReadTicketShopGetNftAddress({
    address: ticketShopAddress,
  })

  const { data: ticketNftAllBurners } = useReadTicketNftGetAllBurner({
    address: ticketNftAddress,
  })

  const { data: ticketMetadata, isSuccess } = useReadTicketShopGetTicketMetadata({
    address: ticketShopAddress,
  })

  const { data: shopPaymasterBalance_jpyc } = useReadJpycBalanceOf({
    address: JPYC_ADDRESS,
    args: [
      shopPaymasterAddress!,
    ],
  })

  const { data: ticketShopBalance_jpyc } = useReadJpycBalanceOf({
    address: JPYC_ADDRESS,
    args: [
      ticketShopAddress,
    ],
  })

  const metadata = ticketMetadata as TicketMetadata

  const ticketsLeft = ticketMetadata?.pricing.reduce(
    (acc, item) => acc + Number(item.tickets),
    0,
  )

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
          <Row>
            <Col span={24}>
              <Flex align="end" vertical>
                <Space className="bg-white p-3 px-5 m-3 rounded-xl" direction="vertical">
                  <h1 className="text-xl capitalize font-bold">Shop</h1>
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
                      <PrimaryButton>Withdraw</PrimaryButton>
                    </Space>
                  </div>
                  <div className="flex flex-row justify-between">
                    <Statistic
                      title="tickets left"
                      value={Number(ticketsLeft) || "Unknown"}
                    />
                  </div>
                </Space>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex align="end" vertical>
                <Space className="bg-white p-3 px-5 m-3 rounded-xl" direction="vertical">
                  <h1 className="text-xl capitalize font-bold">NFT</h1>
                  <Statistic
                    title="address"
                    value={ticketNftAddress}
                  />
                  <Statistic
                    title="burners"
                    value={ticketNftAllBurners?.join(",")}
                  />
                </Space>
              </Flex>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Flex align="start" vertical>
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
                  <PrimaryButton>Deposit</PrimaryButton>
                  <PrimaryButton>Withdraw</PrimaryButton>
                </Space>
              </div>
              <div className="flex flex-row justify-between">
                <Statistic
                  title="balance (JPYC)"
                  value={Number(shopPaymasterBalance_jpyc) || 0}
                />
                <Space>
                  <PrimaryButton>Withdraw</PrimaryButton>
                </Space>
              </div>
            </Space>
          </Flex>
        </Col>
      </Row>

      {isSuccess && (
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
      )}
    </>
  )
}

export default ShopHomePage
