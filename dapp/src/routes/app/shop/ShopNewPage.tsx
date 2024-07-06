import { CenterDiv } from "@/modules"
import PrimaryButton from "@/modules/ui/PrimaryButton"
import {
  PlusCircle,
  Storefront,
} from "@phosphor-icons/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

const ShopNewPage: FC = () => {
  const navigate = useNavigate()

  function createClickHandler() {
    navigate("/app/create")
  }

  return (
    <CenterDiv className="text-white">
      <Storefront size={128} color="#ccc" weight="fill" />
      <h1>create a shop now</h1>
      <p>and start selling your merchandise with us</p>
      <div className="mt-10">
        <PrimaryButton onClick={createClickHandler}>
          <PlusCircle size={32} color="#404040" weight="fill" />
          <h2 className="capitalize">create</h2>
        </PrimaryButton>
      </div>
    </CenterDiv>
  )
}

export default ShopNewPage
