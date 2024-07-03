import NavBarAction from "@/modules/NavBarActions"
import { Layout } from "antd"
import { Content } from "antd/lib/layout/layout"
import { Outlet } from "react-router-dom"

export default function AppRootPage() {
  return (
    <Layout className="h-screen !bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <NavBarAction />
      <Content className="h-full overflow-auto no-scrollbar ">
        <Outlet />
      </Content>
    </Layout>
  )
}
