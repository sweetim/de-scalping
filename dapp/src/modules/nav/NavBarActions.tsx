import { User } from "@phosphor-icons/react"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Space,
} from "antd"
import { Header } from "antd/lib/layout/layout"
import {
  FC,
  useEffect,
  useState,
} from "react"
import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import {
  createWalletClient,
  custom,
} from "viem"
import { zkSyncInMemoryNode } from "viem/chains"

const NavBarAction: FC = () => {
  const {
    initModal,
    connect,
    isConnected,
    logout,
    web3Auth,
    provider,
  } = useWeb3Auth()

  // console.log(asa)
  const [ address, setAddress ] = useState<`0x${string}`[]>([])

  useEffect(() => {
    ;(async () => {
      if (!provider) return

      const walletClient = createWalletClient({
        chain: zkSyncInMemoryNode,
        transport: custom<IProvider>(provider),
      })
      setAddress(await walletClient.getAddresses())
    })()
  }, [ provider ])

  useEffect(() => {
    ;(async () => {
      try {
        if (web3Auth) {
          await initModal()
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [ web3Auth ])

  async function loginClickHandler() {
    await connect()
  }

  async function logoutClickHandler() {
    await logout()
  }

  const renderLoginButton = match(isConnected)
    .with(false, () => (
      <Button
        onClick={loginClickHandler}
        size="large"
        shape="round"
      >
        Login
      </Button>
    ))
    .with(true, () => (
      <Button
        onClick={logoutClickHandler}
        size="large"
        shape="round"
        icon={<User size={20} color="#ffebeb" weight="fill" />}
        iconPosition="end"
      >
        {`${(address[0] || "").slice(0, 8)}...`}
      </Button>
    ))
    .exhaustive()

  return (
    <ConfigProvider
      theme={{
        components: {
          Divider: {
            verticalMarginInline: 2,
          },
          Button: {
            defaultHoverColor: "#FFF",
            defaultHoverBg: "rgb(82 82 91)",
            defaultHoverBorderColor: "rgb(82 82 91)",
            defaultColor: "#FFF",
            defaultBg: "#404040",
            defaultActiveBg: "rgb(82 82 91)",
            defaultActiveColor: "#FFF",
            defaultActiveBorderColor: "rgb(82 82 91)",
            defaultBorderColor: "#404040",
            contentFontSizeLG: 14,
          },
        },
      }}
    >
      <Header className="!p-3 !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Flex className="h-full" justify="space-between" align="center">
          <Link to="/app">
            <img
              width={0}
              height={0}
              className="w-9 h-auto"
              sizes="100vw"
              src="/scalp.png"
              alt="logo"
            />
          </Link>
          <Space>
            <Link to="/app/shop">
              <Button size="large" shape="round">
                Shops
              </Button>
            </Link>
            <Divider className="bg-black" type="vertical" />
            <Link to="/app/ticket">
              <Button size="large" shape="round">
                Tickets
              </Button>
            </Link>
            <Divider className="bg-black" type="vertical" />
            <Link to="/app/wallet">
              <Button size="large" shape="round">
                Wallet
              </Button>
            </Link>
            <Divider className="bg-black" type="vertical" />
            {renderLoginButton}
          </Space>
        </Flex>
      </Header>
    </ConfigProvider>
  )
}

export default NavBarAction
