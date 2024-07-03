import { PlusOutlined } from "@ant-design/icons"
import {
  Col,
  DatePicker,
  Flex,
  Image,
  Input,
  Row,
  Space,
  Upload,
  type GetProp,
  type UploadFile,
  type UploadProps,
} from "antd"
import { RangePickerProps } from "antd/lib/date-picker"
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from "react"

const { TextArea } = Input
const { Dragger } = Upload
const { RangePicker } = DatePicker

type EditTicketMetadataProps = {
  onChange: (data: EditTicketMetadataForm) => void
}

export type EditTicketMetadataForm = {
  title: string
  dates: string[]
  location: number[]
  images: string
  description: string
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const IMAGES_LINK = [
  "https://assets.teenvogue.com/photos/65d7cbe5302e6f465c89e9ad/16:9/w_2560%2Cc_limit/GettyImages-2014836466.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMT7NWITmZi1Gcq81z_OgaLY5RsThZkWlAYA&s",
  "https://images.thewest.com.au/publication/C-12601608/442c6c4bb0c10b101839b479b64e98c2238937c5-16x9-x0y92w4000h2250.jpg?imwidth=1224&impolicy=wan_v3",
]

const EditTicketMetadataCard: FC<EditTicketMetadataProps> = ({ onChange }) => {
  const [ data, setData ] = useState<EditTicketMetadataForm>({
    title: "",
    dates: [],
    location: [],
    images: "",
    description: "",
  })

  const [ previewImage, setPreviewImage ] = useState("")
  const [ fileList, setFileList ] = useState<UploadFile[]>([])

  useEffect(() => {
    onChange({
      ...data,
      images: IMAGES_LINK[Math.floor(Math.random() * IMAGES_LINK.length)],
    })
  }, [ data ])

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    multiple: false,
    onChange(info) {
    },
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList)

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

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

  return (
    <Row>
      <Col sm={{ flex: "auto" }}>
        <Flex align="end" vertical>
          <Space direction="vertical" size="middle" className="bg-white p-5 m-3 rounded-2xl min-w-96 max-w-xl">
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
              <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length === 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: true,
                    // onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Space>

            {
              /* <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                add your concert image
              </p>
            </Dragger> */
            }
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
