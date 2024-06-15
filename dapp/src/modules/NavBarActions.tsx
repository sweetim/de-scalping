"use client"

import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Button,
  Flex,
  Space,
} from "antd"
import { Header } from "antd/lib/layout/layout"
import Image from "next/image"
import Link from "next/link"
import {
  FC,
  useEffect,
  useState,
} from "react"
import { match } from "ts-pattern"
import {
  createWalletClient,
  custom,
} from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import { useAccount } from "wagmi"

const NavBarAction: FC = () => {
  const {
    initModal,
    connect,
    isConnected,
    logout,
    web3Auth,
    provider,
  } = useWeb3Auth()
  const { address: asa } = useAccount()
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
        className="!bg-[#404040] !rounded-full !h-[40px] !text-white !border-none"
      >
        Login
      </Button>
    ))
    .with(true, () => (
      <Button
        onClick={logoutClickHandler}
        className="!bg-[#404040] !rounded-full !h-[40px] !text-white !border-none"
      >
        Logout
      </Button>
    ))
    .exhaustive()

  return (
    <Header className="!p-3 !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Flex className="h-full" justify="space-between" align="center">
        <Link href="/">
          <Image
            width={0}
            height={0}
            className="w-9 h-auto"
            sizes="100vw"
            src="/scalp.png"
            priority={false}
            alt="logo"
          />
        </Link>
        <Space>
          <p className="text-white">{address[0]}</p>
          <Link href="/create">
            <Button className="!bg-[#404040] !rounded-full !h-[40px] !text-white !border-none">
              Create
            </Button>
          </Link>
          {renderLoginButton}
        </Space>
      </Flex>
    </Header>
  )
}

export default NavBarAction
