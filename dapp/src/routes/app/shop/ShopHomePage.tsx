import { TICKET_SHOP_QUERY } from "@/graphql/queries/ticketShop"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { useQuery } from "@apollo/client"

import { FC } from "react"

const ShopHomePage: FC = () => {
  const { walletAddress } = useWalletInfo()

  const { data } = useQuery(TICKET_SHOP_QUERY, {
    variables: {
      owner: walletAddress,
    },
  })

  return <h1>{`you have ${data?.ticketShops.length} shops`}</h1>
}

export default ShopHomePage
