import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import {
  Button,
  Col,
  Row,
  Steps,
} from "antd"
import classnames from "classnames"
import {
  FC,
  ReactElement,
  useState,
} from "react"

export type StepperEditFormProps = {
  steps: string[]
  children: ReactElement[]
}

const StepperEditForm: FC<StepperEditFormProps> = ({ steps, children: childrens }) => {
  const [ currentStep, setCurrentStep ] = useState(0)

  const previousClassName = classnames(
    "bg-purple-300 text-black",
    {
      invisible: currentStep === 0,
    },
  )

  const nextClassName = classnames(
    "bg-purple-300 text-black",
    {
      invisible: steps.length === currentStep + 1,
    },
  )

  function previousClickHandler() {
    setCurrentStep(step => step - 1)
  }

  function nextClickHandler() {
    setCurrentStep(step => step + 1)
  }

  const items = steps.map((item) => ({
    key: item,
    title: item,
  }))

  return (
    <div className="flex flex-col w-full justify-center">
      <Row className="w-full">
        <Col span={12} offset={6}>
          <div className="flex flex-row justify-between">
            <Button
              className={previousClassName}
              type="primary"
              icon={<LeftOutlined />}
              onClick={previousClickHandler}
            >
              Previous
            </Button>
            <Steps
              className="!px-8"
              current={currentStep}
              items={items}
            />
            <Button
              className={nextClassName}
              type="primary"
              iconPosition="end"
              icon={<RightOutlined />}
              onClick={nextClickHandler}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
      <div className="w-full flex justify-center">
        {childrens[currentStep]}
      </div>
    </div>
  )
}

export default StepperEditForm
