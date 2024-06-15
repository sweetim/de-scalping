import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { abi as JPYCAbi } from "./abis/JPYC.json"
import { abi as ShopPaymasterAbi } from "./abis/ShopPaymaster.json"
import { abi as TicketERC20Abi } from "./abis/TicketERC20.json"
import { abi as TicketNFTAbi } from "./abis/TicketNFT.json"
import { abi as TicketSchemaAbi } from "./abis/TicketSchema.json"
import { abi as TicketShopAbi } from "./abis/TicketShop.json"
import { abi as TicketShopFactoryAbi } from "./abis/TicketShopFactory.json"
import { abi as USDTAbi } from "./abis/USDT.json"

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
      name: "TicketNFT",
      abi: TicketNFTAbi as any,
    },
    {
      name: "TicketSchema",
      abi: TicketSchemaAbi as any,
    },
    {
      name: "TicketShopFactory",
      abi: TicketShopFactoryAbi as any,
    },
    {
      name: "USDT",
      abi: USDTAbi as any,
    },
    {
      name: "JPYC",
      abi: JPYCAbi as any,
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
