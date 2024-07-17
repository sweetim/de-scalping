import ProtectedRoute from "@/modules/common/ProtectedRoute"
import {
  AppRootPage,
  EventAddressPage,
  EventPage,
  LandingPage,
  ShopByAddressNft,
  ShopByAddressOverview,
  ShopByAddressPaymaster,
  ShopByAddressRootPage,
  ShopCreatePage,
  ShopHomePage,
  ShopNewPage,
  ShopRootPage,
  TicketsPage,
  WalletPage,
} from "@/routes"
import { createBrowserRouter } from "react-router-dom"

export type ShopByAddressPageParams = {
  ticketShopAddress: `0x${string}`
}

const shopByAddressPageLoader = async ({ params }: any) => {
  return params as ShopByAddressPageParams
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "app",
    element: <AppRootPage />,
    children: [
      {
        index: true,
        element: <EventPage />,
      },
      {
        path: "events/:address",
        element: <EventAddressPage />,
      },
      {
        path: "shop",
        element: <ShopRootPage />,
        children: [
          {
            index: true,
            element: <ShopHomePage />,
          },
          {
            path: "new",
            element: <ShopNewPage />,
          },
          {
            path: "address/:ticketShopAddress",
            element: <ShopByAddressRootPage />,
            children: [
              {
                path: "overview",
                element: <ShopByAddressOverview />,
                loader: shopByAddressPageLoader,
              },
              {
                path: "paymaster",
                element: <ShopByAddressPaymaster />,
                loader: shopByAddressPageLoader,
              },
              {
                path: "nft",
                element: <ShopByAddressNft />,
                loader: shopByAddressPageLoader,
              },
              {
                path: "new",
                element: <ShopNewPage />,
              },
            ],
          },
        ],
      },
      {
        path: "shop/create",
        element: <ShopCreatePage />,
      },
      {
        path: "wallet",
        element: (
          <ProtectedRoute>
            <WalletPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "ticket",
        element: (
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
