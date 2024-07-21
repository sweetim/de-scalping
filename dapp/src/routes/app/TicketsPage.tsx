import { TICKET_QUERY_BY_OWNER } from "@/graphql/queries/ticketShop"
import { useTicketNft } from "@/hooks/useTicketNft"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { useQuery } from "@apollo/client"
import { QrCode } from "@phosphor-icons/react"
import {
  Avatar,
  Modal,
  QRCode,
  Space,
} from "antd"
import {
  format,
  formatDistanceToNow,
} from "date-fns"
import {
  FC,
  useState,
} from "react"

const TicketsPage: FC = () => {
  const { walletAddress } = useWalletInfo()

  const { data: tickets } = useQuery(
    TICKET_QUERY_BY_OWNER,
    {
      variables: {
        owner: walletAddress,
      },
    },
  )

  return (
    <div className="p-3">
      <h1 className="text-2xl text-slate-300">Upcoming events</h1>
      <Space className="py-5">
        {tickets && tickets.tickets.map((item, index) => (
          <TicketByShopCard
            key={index}
            ticketShopAddress={item.ticketShop}
            ticketId={BigInt(item.ticketId) + 1n}
          />
        ))}
      </Space>
      <h1 className="text-2xl text-slate-300">Completed</h1>
    </div>
  )
}

type TicketByShopCardProps = {
  ticketShopAddress: `0x${string}`
  ticketId: bigint
}

const TicketByShopCard: FC<TicketByShopCardProps> = ({ ticketShopAddress, ticketId }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const { tokenUris } = useTicketNft({
    ticketShopAddress,
    tokenIds: [ ticketId ],
  })

  function qrCodeClickHandler() {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Space>
      {tokenUris.map(item => (
        <div className="bg-white rounded-xl">
          <Modal
            title={`Ticket #${item.ticketId}`}
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <div className="flex flex-col justify-center items-center">
              <p>{item.name}</p>
              <QRCode
                size={256}
                value={Buffer.from(JSON.stringify(item)).toString("base64")}
              />
            </div>
          </Modal>
          <div className="flex flex-row justify-between px-1">
            <h1 className="p-2 text-base font-bold">{item.name}</h1>
            <Avatar
              onClick={qrCodeClickHandler}
              className="cursor-pointer mr-1 mt-2 bg-zinc-700 hover:bg-zinc-600 rounded-full p-1"
            >
              <QrCode size={18} color="#fff" weight="fill" />
            </Avatar>
          </div>
          <img
            className="my-2 min-w-80 max-w-80 max-h-40 object-cover"
            src={item.image}
            alt="ticket-image"
          />
          <div className="p-2 ">
            <div className="grid gap-2 grid-cols-2 text-center font-bold">
              <p className="bg-purple-300 p-2 rounded-xl">{item.ticketType}</p>
              <p className="bg-purple-300 p-2 rounded-xl">#{item.ticketId}</p>
            </div>
            <div className="py-2">
              <p className="text-gray-500 text-base">
                {format(new Date(item.startDate), "MM-dd-yyyy")}
                <span className="px-2">to</span>
                {format(new Date(item.endDate), "MM-dd-yyyy")}
              </p>
              <p>{formatDistanceToNow(new Date(item.startDate), { addSuffix: true })}</p>
              <p className="text-blue-500 text-base">
                <a target="_blank" href={item.locationUri}>{item.locationName}</a>
              </p>
            </div>
          </div>
        </div>
      ))}
    </Space>
  )
}

export default TicketsPage
