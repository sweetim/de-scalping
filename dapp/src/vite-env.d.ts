/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_WEB3_AUTH_CLIENT_ID: string
  readonly VITE_TICKET_ERC20_ADDRESS: `0x${string}`
  readonly VITE_USDT_ADDRESS: `0x${string}`
  readonly VITE_JPYC_ADDRESS: `0x${string}`
  readonly VITE_TICKET_SHOP_FACTORY_ADDRESS: `0x${string}`
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
