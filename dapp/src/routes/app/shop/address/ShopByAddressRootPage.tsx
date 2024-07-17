import { Outlet } from "react-router-dom"

const ShopByAddressRootPage = () => {
  return (
    <div className="-full h-full flex flex-row">
      <Outlet />
    </div>
  )
}

export default ShopByAddressRootPage
