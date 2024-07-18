import { Divider } from "antd"

import {
  CHAIN_TO_USE,
  getErc20AddressFrom,
  TICKET_SHOP_FACTORY_ADDRESS,
} from "@/contract"
import { ticketShopFactoryAbi } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import {
  createWalletClient,
  custom,
} from "viem"
import { usePublicClient } from "wagmi"
import PrimaryButton from "../ui/PrimaryButton"
import { useEditTicketStore } from "./useEditTicketStore"

const EditTicketPublishFragment: FC = () => {
  const navigate = useNavigate()
  const editTicketStoreData = useEditTicketStore(state => state.data)
  const { provider } = useWeb3Auth()
  const { walletAddress } = useWalletInfo()
  const publicClient = usePublicClient()

  async function publishClickHandler() {
    if (!provider) return
    if (!walletAddress) return
    if (!publicClient) return
    if (!editTicketStoreData.erc20Symbol) return

    const walletClient = createWalletClient({
      chain: CHAIN_TO_USE,
      transport: custom<IProvider>(provider),
    })

    await publicClient.waitForTransactionReceipt({
      hash: await walletClient.writeContract({
        account: walletAddress,
        abi: ticketShopFactoryAbi,
        address: TICKET_SHOP_FACTORY_ADDRESS,
        functionName: "createTicketShop",
        args: [
          editTicketStoreData.ticketMetadata,
          getErc20AddressFrom(editTicketStoreData.erc20Symbol),
        ],
      }),
    })

    navigate("/app/shop")
  }

  return (
    <div className="bg-white/80 rounded-lg p-3 w-1/2 m-10 flex flex-col justify-center">
      <h2 className="text-2xl">Publish tickets</h2>
      <Divider />
      <div className="pb-8">
        <p>
          Expected paymaster fee <strong>0.05 ETH</strong>
        </p>
        <p className="text-slate-500">
          <strong>0.05 ETH</strong>{" "}
          will be transferred from your account to paymaster account to fund the transaction fee for your users
        </p>
      </div>
      <div className="flex justify-center">
        <PrimaryButton dark className="max-w-fit px-10" onClick={publishClickHandler}>
          PUBLISH
        </PrimaryButton>
      </div>
    </div>
  )
}

export default EditTicketPublishFragment
