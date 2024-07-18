import {
  EditTicketPreviewFragment,
  EditTicketPricingFragment,
  EditTicketPublishFragment,
  StepperEditForm,
} from "@/modules"
import EditTicketMetadataFragment from "@/modules/edit-ticket/EditTicketMetadataFragment"

const steps = [
  {
    title: "Title",
  },
  {
    title: "Tickets",
  },
  {
    title: "Preview",
  },
  {
    title: "Publish",
  },
]

export default function ShopCreatePage() {
  return (
    <div className="mt-10">
      <StepperEditForm steps={steps.map(item => item.title)}>
        <EditTicketMetadataFragment />
        <EditTicketPricingFragment />
        <EditTicketPreviewFragment />
        <EditTicketPublishFragment />
      </StepperEditForm>
    </div>
  )
}

// 35.705735405562066, 139.7519020251974
