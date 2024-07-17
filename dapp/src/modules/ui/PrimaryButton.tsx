import { Space } from "antd"
import classnames from "classnames"
import {
  FC,
  MouseEventHandler,
  ReactNode,
} from "react"
import { twMerge } from "tailwind-merge"
import { match } from "ts-pattern"

type PrimaryButtonProps = {
  children: string | ReactNode
  className?: string
  dark?: boolean
  rounded?: boolean
  icon?: ReactNode
  iconPosition?: "start" | "end"
  selected?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  dark,
  rounded,
  className,
  children,
  icon,
  iconPosition,
  selected,
  onClick,
}) => {
  const items = [
    icon,
    children,
  ]

  const buttonClassName = classnames(
    `bg-purple-300
    text-black
    rounded-xl
    border-none
    py-2.5
    px-5
    hover:bg-purple-200`,
    {
      "text-white": dark,
      "bg-zinc-700": dark,
      "hover:bg-zinc-600": dark,
      "rounded-3xl": rounded,
      "ring-2 ring-offset-2 ring-purple-500": selected,
    },
  )

  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(buttonClassName, className)}
    >
      <Space className="flex flex-row items-center justify-center">
        {match(iconPosition)
          .with("end", () => items.reverse())
          .otherwise(() => items)}
      </Space>
    </button>
  )
}

export default PrimaryButton
