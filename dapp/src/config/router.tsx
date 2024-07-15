import ProtectedRoute from "@/modules/common/ProtectedRoute"
import {
  AppRootPage,
  EventAddressPage,
  EventPage,
  LandingPage,
  ShopByAddressPage,
  ShopCreatePage,
  ShopHomePage,
  ShopNewPage,
  ShopRootPage,
  TicketsPage,
  WalletPage,
} from "@/routes"
import { createBrowserRouter } from "react-router-dom"

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
        element: (
          <ProtectedRoute>
            <ShopRootPage />
          </ProtectedRoute>
        ),
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
            path: "create",
            element: <ShopCreatePage />,
          },
        ],
      },
      {
        path: "shop/:ticketShopAddress",
        element: <ShopByAddressPage />,
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
