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
    navigate("/app/shop/create")
  }

  return (
    <CenterDiv className="text-black">
      <Storefront size={128} color="#404040" weight="duotone" />
      <h1>create a shop now</h1>
      <p>and start selling your merchandise with us</p>
      <div className="mt-10">
        <PrimaryButton dark onClick={createClickHandler}>
          <PlusCircle size={32} color="#c7aef6" weight="fill" />
          <h2 className="capitalize">create</h2>
        </PrimaryButton>
      </div>
    </CenterDiv>
  )
}

export default ShopNewPage
