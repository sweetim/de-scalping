import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import {
  Col,
  ConfigProvider,
  Row,
  Steps,
} from "antd"
import {
  FC,
  ReactElement,
  useState,
} from "react"
import PrimaryButton from "./ui/PrimaryButton"

export type StepperEditFormProps = {
  steps: string[]
  children: ReactElement[]
}

const StepperEditForm: FC<StepperEditFormProps> = ({ steps, children: childrens }) => {
  const [ currentStep, setCurrentStep ] = useState(0)

  function previousClickHandler() {
    setCurrentStep(step =>
      step === 0
        ? step
        : step - 1
    )
  }

  function nextClickHandler() {
    setCurrentStep(step =>
      step + 1 === steps.length
        ? step
        : step + 1
    )
  }

  const items = steps.map((item) => ({
    key: item,
    title: item,
  }))

  return (
    <div className="flex flex-col w-full justify-center">
      <Row className="w-full">
        <Col span={12} offset={6}>
          <div className="flex flex-row justify-between align-middle items-center">
            {currentStep !== 0 && (
              <PrimaryButton
                icon={<LeftOutlined />}
                onClick={previousClickHandler}
              >
                Previous
              </PrimaryButton>
            )}
            <ConfigProvider
              theme={{
                token: {
                  colorSplit: "rgba(5, 5, 5, 0.1)",
                  colorTextLightSolid: "black",
                  colorPrimary: "rgb(216 180 254)",
                  colorText: "#333",
                },
              }}
            >
              <Steps
                className="!px-8"
                current={currentStep}
                items={items}
              />
            </ConfigProvider>
            {currentStep < (steps.length - 1) && (
              <PrimaryButton
                iconPosition="end"
                icon={<RightOutlined />}
                onClick={nextClickHandler}
              >
                Next
              </PrimaryButton>
            )}
          </div>
        </Col>
      </Row>
      <div className="w-full flex justify-center py-6">
        {childrens[currentStep]}
      </div>
    </div>
  )
}

export default StepperEditForm
