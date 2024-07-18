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
} from "react"

import dayjs from "dayjs"
import UploadImageInput from "./UploadImageInput"
import { useEditTicketStore } from "./useEditTicketStore"

const { TextArea } = Input
const { RangePicker } = DatePicker

export type EditTicketMetadataForm = {
  name: string
  dates: string[]
  location: number[]
  imageUri: string
  description: string
}

const EditTicketMetadataFragment: FC = () => {
  const ticketMetadata = useEditTicketStore(state => state.data.ticketMetadata)
  const setNameForm = useEditTicketStore(state => state.setNameForm)
  const setDescriptionForm = useEditTicketStore(state => state.setDescriptionForm)
  const setDateRangeForm = useEditTicketStore(state => state.setDateRangeForm)
  const setLocationForm = useEditTicketStore(state => state.setLocationForm)
  const setImageUriForm = useEditTicketStore(state => state.setImageUriForm)

  function nameInputHandler(ev: ChangeEvent<HTMLInputElement>) {
    setNameForm(ev.target.value)
  }

  function descriptionInputHandler(ev: ChangeEvent<HTMLTextAreaElement>) {
    setDescriptionForm(ev.target.value)
  }
  function dateRangePickerHandler(_dates: RangePickerProps["value"], dateString: [string, string]) {
    setDateRangeForm(dateString)
  }

  function locationInputHandler(ev: ChangeEvent<HTMLInputElement>) {
    setLocationForm(ev.target.value.split(",").map(Number))
  }

  function onUploadedImageHandler(ipfsUri: string) {
    setImageUriForm(`${import.meta.env.VITE_PINATA_GATEWAY}/${ipfsUri}`)
  }

  return (
    <Row className="w-1/2">
      <Col className="w-full">
        <Flex>
          <Space direction="vertical" size="middle" className="bg-white/80 p-5 m-3 rounded-2xl w-full">
            <Space className="w-full" direction="vertical" size="small">
              <h2>Name</h2>
              <Input
                className="font-bold"
                placeholder="Name"
                defaultValue={ticketMetadata.name}
                onChange={nameInputHandler}
              />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Dates</h2>
              <RangePicker
                defaultValue={[
                  dayjs(Number(ticketMetadata.dates[0])),
                  dayjs(Number(ticketMetadata.dates[1])),
                ]}
                onChange={dateRangePickerHandler}
              />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Location</h2>
              <Input
                defaultValue={ticketMetadata.location.uri}
                onChange={locationInputHandler}
                placeholder="Location"
              />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Images</h2>
              <UploadImageInput
                defaultImageUri={ticketMetadata.uri}
                id={ticketMetadata.id}
                onUploadedImage={onUploadedImageHandler}
              />
            </Space>
            <Space className="w-full" direction="vertical" size="small">
              <h2>Description</h2>
              <TextArea
                defaultValue={ticketMetadata.description}
                onChange={descriptionInputHandler}
                rows={3}
              />
            </Space>
          </Space>
        </Flex>
      </Col>
    </Row>
  )
}

export default EditTicketMetadataFragment
