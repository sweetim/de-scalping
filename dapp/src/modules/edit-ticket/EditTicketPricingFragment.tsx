import { SupportedErc20Symbol } from "@/contract"
import {
  Avatar,
  Space,
} from "antd"
import { FC } from "react"
import { useImmer } from "use-immer"
import { PrimaryButton } from "../ui"
import EditTicketPriceTable from "./EditTicketPriceTable"
import { useEditTicketStore } from "./useEditTicketStore"

const EditTicketPricingFragment: FC = () => {
  const supportedErc20Symbol = useEditTicketStore(state => state.data.erc20Symbol)
  const setSupportedErc20SymbolForm = useEditTicketStore(state => state.setSupportedErc20SymbolForm)

  const [ supportedStableCoin, setSupportedStableCoin ] = useImmer([
    {
      selected: false,
      title: "USDT",
      icon: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
    },
    {
      selected: false,
      title: "USDC",
      icon:
        "data:image/png;base64,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",
    },
    {
      selected: false,
      title: "JPYC",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd1FLPY6Qq-GOSm-8M4bka9NKSY2MHUf_3w&s",
    },
  ].map(item => ({ ...item, selected: item.title === supportedErc20Symbol })))

  function stableCoinClickHandler(index: number) {
    setSupportedStableCoin(prev => prev.map((item, i) => ({ ...item, selected: index === i })))
    setSupportedErc20SymbolForm(supportedStableCoin[index].title as SupportedErc20Symbol)
  }

  return (
    <Space direction="vertical" className="w-1/2">
      <div className="bg-white/80 p-3 rounded-md">
        <h1 className="font-medium">Select stable coin used to receive payment for ticket purchase</h1>
        <Space className="pt-3">
          {supportedStableCoin.map((item, index) => (
            <PrimaryButton
              dark
              selected={item.selected}
              key={item.title}
              icon={<Avatar src={item.icon} />}
              onClick={() => stableCoinClickHandler(index)}
            >
              {item.title}
            </PrimaryButton>
          ))}
        </Space>
      </div>
      <EditTicketPriceTable />
    </Space>
  )
}

export default EditTicketPricingFragment
