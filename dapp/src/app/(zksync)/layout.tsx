"use client"

import NavBarAction from "@/modules/NavBarActions"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { MetamaskAdapter } from "@web3auth/metamask-adapter"
import { Web3AuthOptions } from "@web3auth/modal"
import {
  Web3AuthContextConfig,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks"
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin"
import { Layout } from "antd"
import { Content } from "antd/lib/layout/layout"
import { toHex } from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import {
  createConfig,
  http,
  WagmiProvider,
} from "wagmi"

const queryClient = new QueryClient()
const WEB3_AUTH_CLIENT_ID = "BNJRSXS1UtdwjQ_Ox5dwgdUQe3G9QbHp2oNfVR_6E8dsZePqGzumiY8R9UKsENq5D_Psuh6Fr0jJdNMQlqxJ_Uk"

const chainConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: toHex(zkSyncInMemoryNode.id),
  rpcTarget: zkSyncInMemoryNode.rpcUrls.default.http[0],
  displayName: zkSyncInMemoryNode.name,
  blockExplorerUrl: zkSyncInMemoryNode.blockExplorers?.default.url || "https://sepolia.explorer.zksync.io/",
  ticker: zkSyncInMemoryNode.nativeCurrency.symbol,
  tickerName: zkSyncInMemoryNode.nativeCurrency.name,
  isTestnet: true,
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

const metamaskAdapter = new MetamaskAdapter({
  clientId: WEB3_AUTH_CLIENT_ID,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  chainConfig,
})

const web3AuthOptions: Web3AuthOptions = {
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
}

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: {
      showWidgetButton: true,
    },
  },
})

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [ metamaskAdapter ],
  plugins: [ walletServicesPlugin ],
  // plugins: [],
}

const config = createConfig({
  chains: [ zkSyncInMemoryNode ],
  transports: {
    [zkSyncInMemoryNode.id]: http(),
  },
})

export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Layout className="h-screen !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <NavBarAction />
            <Content className="h-full overflow-auto no-scrollbar ">
              {children}
            </Content>
          </Layout>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3AuthProvider>
  )
}
