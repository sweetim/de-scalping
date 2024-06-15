import "./globals.css"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import {
  ConfigProvider,
  ThemeConfig,
} from "antd"
import type { Metadata } from "next"
import { Mali } from "next/font/google"

const mali = Mali({
  weight: "400",
  subsets: [ "latin" ],
})

const antThemeConfig: ThemeConfig = {
  token: {
    fontFamily: "mali",
  },
  components: {
    Layout: {
      bodyBg: "white",
    },
  },
}

export const metadata: Metadata = {
  title: "de-scalper",
  description: "transparent ticket buying platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${mali.className} h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>
        <ConfigProvider theme={antThemeConfig}>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  )
}
