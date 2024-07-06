import { useTokenBalance } from "@/hooks/useTokenBalance"
import { CenterDiv } from "@/modules"
import { UserList } from "@phosphor-icons/react"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  List,
  Space,
} from "antd"
import Paragraph from "antd/lib/typography/Paragraph"
import Title from "antd/lib/typography/Title"
import { FC } from "react"
import {
  match,
  P,
} from "ts-pattern"

const WalletPage: FC = () => {
  const { userInfo } = useWeb3Auth()
  const { tokensData, walletAddress } = useTokenBalance()
  console.log(tokensData, userInfo?.profileImage)

  const renderAvatar = match(userInfo?.profileImage)
    .with(P.string, () => <Avatar size={64} src={userInfo?.profileImage} />)
    .otherwise(() => <Avatar size={64} icon={<UserList size={32} color="#ffebeb" weight="fill" />} />)

  return (
    <CenterDiv>
      <div className="bg-white p-5 rounded-xl min-w-96">
        <Space
          className="w-full"
          direction="vertical"
          size="middle"
        >
          <Space
            className="w-full"
            direction="vertical"
            size="middle"
            align="center"
          >
            <Title>Wallet</Title>
            {renderAvatar}
            <Paragraph ellipsis copyable className="w-48 font-bold">
              {walletAddress?.toString()}
            </Paragraph>
          </Space>
          <List
            itemLayout="horizontal"
            dataSource={tokensData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.icon} />}
                  title={item.title}
                />
                <h2 className="text-xl font-bold">{item.amount?.toLocaleString()}</h2>
              </List.Item>
            )}
          >
          </List>
        </Space>
      </div>
    </CenterDiv>
  )
}

export default WalletPage
