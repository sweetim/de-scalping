import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { abi as ShopPaymasterAbi } from "./abis/ShopPaymaster.json"
import { abi as TicketERC20Abi } from "./abis/TicketERC20.json"
import { abi as TicketShopAbi } from "./abis/TicketShop.json"

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "TicketShop",
      abi: TicketShopAbi as any,
    },
    {
      name: "ShopPaymaster",
      abi: ShopPaymasterAbi as any,
    },
    {
      name: "TicketERC20",
      abi: TicketERC20Abi as any,
    },
  ],
  plugins: [
    react(),
  ],
})
