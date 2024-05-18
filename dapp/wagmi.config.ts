import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { abi } from "./TicketMaster.json"

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'TicketMaster',
      abi: abi as any,
    },
  ],
  plugins: [
    react(),
  ],
})
