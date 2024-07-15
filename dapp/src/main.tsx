import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { Web3AuthProvider } from "@web3auth/modal-react-hooks"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { WagmiProvider } from "wagmi"
import {
  router,
  wagmiConfig,
  web3AuthProviderContextConfig,
} from "./config"
import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthProviderContextConfig}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </Web3AuthProvider>
  </React.StrictMode>,
)
