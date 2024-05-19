"use client"

import Image from 'next/image'
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flex, Layout } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import { ConnectKitButton, ConnectKitProvider, getDefaultConfig } from "connectkit";
import { zkSyncInMemoryNode, zkSyncSepoliaTestnet } from "viem/chains";
import { WagmiProvider, createConfig, http } from "wagmi";

const config = createConfig(
  getDefaultConfig({
    chains: [
      zkSyncSepoliaTestnet,
      zkSyncInMemoryNode,
    ],
    transports: {
      [zkSyncSepoliaTestnet.id]: http(),
      [zkSyncInMemoryNode.id]: http(),
    },
    walletConnectProjectId: "3744d5a2fe976f821f378bdd74fcab66",
    appName: "de-scalper",
    ssr: true,
    // Optional App Info
    appDescription: "decentralized ticket platform",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png",
  })
)

const queryClient = new QueryClient()

export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Layout className="h-screen">
            <Header className="!p-3 !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <Flex className="h-full"
                justify="space-between"
                align="center">
                <Link href="/">
                  <Image width={0}
                    height={0}
                    className="w-9 h-auto"
                    sizes="100vw"
                    src="/scalp.png"
                    priority={false}
                    alt="logo" />
                </Link>
                <div className="fixed top-3 right-3">
                  <ConnectKitButton />
                </div>
              </Flex>
            </Header>
            <Content className="h-full overflow-auto no-scrollbar">
              {children}
            </Content>
          </Layout>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
