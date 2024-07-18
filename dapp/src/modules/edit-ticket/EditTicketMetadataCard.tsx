import {
  Col,
  DatePicker,
  Flex,
  Input,
  Row,
  Space,
} from "antd"
import { RangePickerProps } from "antd/lib/date-picker"
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from "react"
import UploadImageInput from "./UploadImageInput"

const { TextArea } = Input
const { RangePicker } = DatePicker

type EditTicketMetadataProps = {
  id: string
  onChange: (data: EditTicketMetadataForm) => void
}

export type EditTicketMetadataForm = {
  title: string
  dates: string[]
  location: number[]
  imageUri: string
  description: string
}

const EditTicketMetadataCard: FC<EditTicketMetadataProps> = ({ id, onChange }) => {
  const [ data, setData ] = useState<EditTicketMetadataForm>({
    title: "",
    dates: [],
    location: [],
    imageUri: "",
    description: "",
  })

  useEffect(() => {
    onChange(data)
  }, [ data ])

  function titleInputHandler(ev: ChangeEvent<HTMLInputElement>) {
    setData(prev => ({
      ...prev,
      title: ev.target.value,
    }))
  }

  function dateRangePickerHandler(dates: RangePickerProps["value"], dateString: [string, string]) {
    setData(prev => ({
      ...prev,
      dates: dateString,
    }))
    console.log(dates, dateString)
  }

  function locationInputHandler(ev: ChangeEvent<HTMLInputElement>) {
    const location = ev.target.value.split(",").map(Number)
    setData(prev => ({
      ...prev,
      location,
    }))
  }

  function descriptionInputHandler(ev: ChangeEvent<HTMLTextAreaElement>) {
    setData(prev => ({
      ...prev,
      description: ev.target.value,
    }))
  }

  function onUploadedImageHandler(ipfsUri: string) {
    setData(prev => ({
      ...prev,
      imageUri: `${import.meta.env.VITE_PINATA_GATEWAY}/${ipfsUri}`,
    }))
  }

  return (
    <Row className="w-1/2">
      <Col className="w-full">
        <Flex>
          <Space direction="vertical" size="middle" className="bg-white/60 p-5 m-3 rounded-2xl w-full">
            <Space className="w-full" direction="vertical" size="small">
              <h2>Title</h2>
              <Input className="font-bold" placeholder="Title" onChange={titleInputHandler} />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Dates</h2>
              <RangePicker onChange={dateRangePickerHandler} />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Location</h2>
              <Input onChange={locationInputHandler} placeholder="Location" />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Images</h2>
              <UploadImageInput
                id={id}
                onUploadedImage={onUploadedImageHandler}
              />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Description</h2>
              <TextArea onChange={descriptionInputHandler} rows={3} />
            </Space>
          </Space>
        </Flex>
      </Col>
    </Row>
  )
}

export default EditTicketMetadataCard
