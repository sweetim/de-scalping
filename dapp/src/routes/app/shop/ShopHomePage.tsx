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
    fetchPolicy: "no-cache",
  })

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}

export default ShopHomePage
