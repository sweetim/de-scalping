"use client"

import { WALLET_CONFIG } from "@/contract"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import {
  Button,
  Flex,
  Layout,
  Space,
} from "antd"
import {
  Content,
  Header,
} from "antd/lib/layout/layout"
import {
  ConnectKitButton,
  ConnectKitProvider,
} from "connectkit"
import Image from "next/image"
import Link from "next/link"
import { WagmiProvider } from "wagmi"

const queryClient = new QueryClient()

export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WagmiProvider config={WALLET_CONFIG}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Layout className="h-screen">
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
                <div className="fixed top-3 right-3">
                  <Space className="flex flex-row justify-center align-middle items-center">
                    <Link href="/create">
                      <Button className="!bg-[#404040] !rounded-full !h-[40px] !text-white !border-none">Create</Button>
                    </Link>
                    <ConnectKitButton />
                  </Space>
                </div>
              </Flex>
            </Header>
            <Content className="h-full overflow-auto no-scrollbar !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {children}
            </Content>
          </Layout>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
