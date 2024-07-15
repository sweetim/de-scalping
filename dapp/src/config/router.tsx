import {
  AppRootPage,
  EventPage,
  LandingPage,
  ShopCreatePage,
  ShopHomePage,
  ShopNewPage,
  ShopRootPage,
  TicketAddressPage,
  TicketsPage,
  WalletPage,
} from "@/routes"
import {
  createBrowserRouter,
  redirect,
} from "react-router-dom"

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
        path: "",
        loader: async () => redirect("events"),
      },
      {
        path: "events",
        element: <EventPage />,
      },
      {
        path: "shop",
        element: <ShopRootPage />,
        children: [
          {
            path: "",
            loader: async () => redirect("new"),
          },
          {
            path: "new",
            element: <ShopNewPage />,
          },
          {
            path: "home",
            element: <ShopHomePage />,
          },
          {
            path: "create",
            element: <ShopCreatePage />,
          },
        ],
      },
      {
        path: "wallet",
        element: <WalletPage />,
      },
      {
        path: "ticket",
        element: <TicketsPage />,
      },
      {
        path: "ticket/:address",
        element: <TicketAddressPage />,
      },
    ],
  },
])
