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
import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom"
import {
  http,
  toHex,
} from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import {
  createConfig,
  WagmiProvider,
} from "wagmi"
import "./index.css"
import LandingPage from "./routes/LandingPage"
import EventPage from "./routes/app/EventPage"
import AppRootPage from "./routes/app/RootPage"
import TicketPage from "./routes/app/TicketPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "app",
    element: <AppRootPage />,
    children: [
      {
        path: "",
        loader: async () => redirect("events"),
      },
      {
        path: "events",
        element: <EventPage />,
      },
      {
        path: "ticket/:address",
        element: <TicketPage />,
      },
    ],
  },
])

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </Web3AuthProvider>
  </React.StrictMode>,
)
