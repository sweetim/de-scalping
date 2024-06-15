import { Flex } from "antd"
import {
  FC,
  ReactElement,
} from "react"

type CenterDivProps = {
  className?: string
  children: ReactElement | ReactElement[]
}

const CenterDiv: FC<CenterDivProps> = ({ children, className }) => {
  return (
    <Flex
      vertical
      gap="small"
      align="center"
      justify="center"
      className={`w-full h-full ${className}`}
    >
      {children}
    </Flex>
  )
}

export default CenterDiv
