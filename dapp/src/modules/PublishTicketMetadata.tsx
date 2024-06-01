import {
  TICKET_SHOP_CONTRACT_ADDRESS,
  TicketMetadata,
} from "@/contract"
import { ticketShopAbi } from "@/generated"
import {
  Button,
  Divider,
} from "antd"
import Link from "next/link"
import {
  FC,
  useState,
} from "react"
import { useWalletClient } from "wagmi"

type PublishTicketMetadataProps = {
  ticketMetadata: TicketMetadata
}

const PublishTicketMetadata: FC<PublishTicketMetadataProps> = ({ ticketMetadata }) => {
  const [ ticketUri, setTicketUri ] = useState("")
  const { data: walletClient } = useWalletClient()
  const [ finish, setFinish ] = useState(false)

  async function publishClickHandler() {
    const { id } = ticketMetadata

    const tx = await walletClient?.writeContract({
      abi: ticketShopAbi,
      address: TICKET_SHOP_CONTRACT_ADDRESS,
      functionName: "createNewCollection",
      args: [
        id,
        ticketMetadata,
      ],
    })

    setFinish(true)
    setTicketUri(id)
  }

  return (
    <div className="bg-white rounded-lg p-3 min-w-96 max-w-96 m-10 flex flex-col justify-center">
      {finish
        ? (
          <>
            <Link className="text-center" href={`/ticket/${ticketUri}`}>
              {`Go to ticket page - ${window.location.origin}/ticket/${ticketUri}`}
            </Link>
          </>
        )
        : null}

      {finish
        ? null
        : (
          <>
            <h2 className="text-2xl">Publish tickets</h2>
            <Divider />
            <p>
              Expected paymaster fee <strong>0.05 ETH</strong>
            </p>
            <p className="text-slate-500">
              <strong>0.05 ETH</strong>{" "}
              will be transferred from your account to paymaster account to fund the transaction fee for your users
            </p>
            <Button className="m-3 !bg-purple-300" onClick={publishClickHandler}>PUBLISH</Button>
          </>
        )}
    </div>
  )
}

export default PublishTicketMetadata
