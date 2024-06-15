export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TICKET_ERC20_ADDRESS: string
      USDT_ADDRESS: string
      JPYC_ADDRESS: string
      TICKET_SHOP_FACTORY_ADDRESS: string
    }
  }
}
