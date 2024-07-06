import { TicketMetadata } from "@/contract"
import {
  Button,
  Divider,
} from "antd"

import {
  FC,
  useState,
} from "react"
import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { useWalletClient } from "wagmi"

type PublishTicketMetadataProps = {
  ticketMetadata: TicketMetadata
}

const PublishTicketMetadata: FC<PublishTicketMetadataProps> = ({ ticketMetadata }) => {
  const [ ticketUri, setTicketUri ] = useState("")
  const { data: walletClient } = useWalletClient()
  const [ finish, setFinish ] = useState(false)
  console.log(walletClient)

  async function publishClickHandler() {
    if (!walletClient) return

    // const { id } = ticketMetadata

    // const tx = await walletClient?.writeContract({
    //   abi: ticketShopFactoryAbi,
    //   address: TICKET_SHOP_FACTORY_ADDRESS,
    //   functionName: "createTicketShop",
    //   args: [
    //     ticketMetadata,
    //     JPYC_ADDRESS
    //   ],
    // })

    // setFinish(true)
    // setTicketUri(id)
  }

  return (
    <div className="bg-white rounded-lg p-3 min-w-96 max-w-96 m-10 flex flex-col justify-center">
      {match(finish)
        .with(true, () => (
          <>
            <Link className="text-center" to={`/app/ticket/${ticketUri}`}>
              {`Go to ticket page - ${window.location.origin}/app/ticket/${ticketUri}`}
            </Link>
          </>
        ))
        .otherwise(() => null)}

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
