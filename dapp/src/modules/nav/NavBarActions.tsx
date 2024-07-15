import { useWalletInfo } from "@/hooks/useWalletInfo"
import { User } from "@phosphor-icons/react"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Space,
} from "antd"
import { Header } from "antd/lib/layout/layout"
import classnames from "classnames"
import {
  FC,
  useEffect,
} from "react"
import {
  Link,
  useLocation,
} from "react-router-dom"
import { match } from "ts-pattern"

type NavBarItem = {
  title: string
  to: string
}

const navBarItems: NavBarItem[] = [
  {
    title: "Shops",
    to: "/app/shop",
  },
  {
    title: "Tickets",
    to: "/app/ticket",
  },
  {
    title: "Wallet",
    to: "/app/wallet",
  },
]

const NavBarAction: FC = () => {
  const {
    initModal,
    connect,
    isConnected,
    logout,
    web3Auth,
  } = useWeb3Auth()

  const location = useLocation()
  const currentToRoute = location.pathname
    .split("/", 3)
    .join("/")

  const { walletAddress } = useWalletInfo()

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
        {`${(walletAddress || "").slice(0, 8)}...`}
      </Button>
    ))
    .exhaustive()

  const renderNavBarItem = match(isConnected)
    .with(true, () => (
      navBarItems.map((item) => (
        <>
          <Link to={item.to} key={item.to}>
            <Button
              className={classnames("", {
                "bg-[#52525b]": currentToRoute === item.to,
              })}
              size="large"
              shape="round"
            >
              {item.title}
            </Button>
          </Link>

          <Divider className="bg-black" type="vertical" />
        </>
      ))
    ))
    .otherwise(() => null)

  return (
    <ConfigProvider
      theme={{
        components: {
          Divider: {
            verticalMarginInline: 2,
          },
          Button: {
            defaultHoverColor: "#FFF",
            defaultHoverBg: "#52525b",
            defaultHoverBorderColor: "#52525b",
            defaultColor: "#FFF",
            defaultBg: "#404040",
            defaultActiveBg: "#52525b",
            defaultActiveColor: "#FFF",
            defaultActiveBorderColor: "#52525b",
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
            {renderNavBarItem}
            {renderLoginButton}
          </Space>
        </Flex>
      </Header>
    </ConfigProvider>
  )
}

export default NavBarAction
