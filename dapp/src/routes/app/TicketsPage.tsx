import { TicketNftTokenUri } from "@/contract"
import { TICKET_QUERY } from "@/graphql/queries/ticketShop"
import { useTicketNft } from "@/hooks/useTicketNft"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { useQuery } from "@apollo/client"
import { QrCode } from "@phosphor-icons/react"
import {
  Modal,
  QRCode,
  Space,
} from "antd"
import { format } from "date-fns"
import {
  FC,
  useState,
} from "react"

const TicketsPage: FC = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ selectedTicket, setSelectedTicket ] = useState<TicketNftTokenUri | null>(null)
  const { walletAddress } = useWalletInfo()

  const { data: tickets } = useQuery(TICKET_QUERY, {
    variables: {
      owner: walletAddress,
    },
  })

  console.log(tickets)

  const { tokenUris } = useTicketNft({
    ticketShopAddress: "0x15d7ff316126f0cbb2fe20708236e57cc60e8dbb",
  })

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  function qrCodeClickHandler(item: TicketNftTokenUri) {
    setSelectedTicket(item)
    setIsModalOpen(true)
  }

  return (
    <div className="p-3">
      <Modal
        title={`Ticket #${selectedTicket?.ticketId}`}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-center items-center">
          <QRCode size={256} value={Buffer.from(JSON.stringify(selectedTicket)).toString("base64")} />
        </div>
      </Modal>
      <h1 className="text-2xl text-slate-300">Upcoming events</h1>
      <Space className="py-5">
        {tokenUris.map((item, index) => (
          <div className="bg-white rounded-xl" key={index}>
            <div className="flex flex-row justify-between px-1">
              <h1 className="p-2 text-base font-bold">{item.name}</h1>
              <button
                onClick={() => qrCodeClickHandler(item)}
                className="mr-1 mt-2 bg-zinc-700 hover:bg-zinc-600 rounded-full p-1"
              >
                <QrCode size={20} color="#fff" weight="fill" />
              </button>
            </div>
            <img
              className="my-2 min-w-80 max-w-80"
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
                <p className="text-blue-500 text-base">
                  <a target="_blank" href={item.locationUri}>{item.locationName}</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Space>
      <h1 className="text-2xl text-slate-300">Completed</h1>
    </div>
  )
}

export default TicketsPage
