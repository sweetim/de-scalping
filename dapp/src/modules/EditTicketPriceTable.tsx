import { TrashSimple } from "@phosphor-icons/react"
import type { GetRef } from "antd"
import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
} from "antd"
import {
  createContext,
  FC,
  Key,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { PrimaryButton } from "./ui"

type EditTicketPriceTableProps = {
  priceUnit: string
  onChange: (data: EditTicketPriceItem[]) => void
}

type FormInstance<T> = GetRef<typeof Form<T>>

const EditableContext = createContext<FormInstance<any> | null>(null)

export type EditTicketPriceItem = {
  key: Key
  name: string
  description: string
  tickets: number
  price: number
}

type EditableRowProps = {
  index: number
}

const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
  const [ form ] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: ReactNode
  editable: boolean
  numeric: boolean
  dataIndex: keyof EditTicketPriceItem
  record: EditTicketPriceItem
  handleSave: (record: EditTicketPriceItem) => void
}

const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  numeric,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [ editing, setEditing ] = useState(false)
  const inputRef = useRef<any>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [ editing ])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing || record.name.length === 0
      ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          {numeric
            ? <InputNumber min={0} ref={inputRef} onPressEnter={save} onBlur={save} />
            : <Input ref={inputRef} onPressEnter={save} onBlur={save} />}
        </Form.Item>
      )
      : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
        </div>
      )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>

const EditTicketPriceTable: FC<EditTicketPriceTableProps> = ({ onChange, priceUnit }) => {
  const [ dataSource, setDataSource ] = useState<EditTicketPriceItem[]>([])

  useEffect(() => {
    onChange(dataSource)
  }, [ dataSource ])

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  }

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; numeric?: boolean; dataIndex: string })[] = [
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1
          ? (
            <Button
              shape="circle"
              onClick={() => handleDelete(record.key)}
              icon={<TrashSimple size={16} color="#f00" weight="fill" />}
            />
          )
          : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Tickets",
      dataIndex: "tickets",
      editable: true,
      numeric: true,
    },
    {
      title: `Price ${priceUnit || ""}`,
      dataIndex: "price",
      editable: true,
      numeric: true,
    },
  ]

  const handleAdd = () => {
    const newData: EditTicketPriceItem = {
      key: Date.now().toString(),
      name: "",
      description: "",
      price: 0,
      tickets: 0,
    }

    setDataSource([ ...dataSource, newData ])
  }

  const handleSave = (row: EditTicketPriceItem) => {
    const newData = [ ...dataSource ]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]

    newData.splice(index, 1, {
      ...item,
      ...row,
    })

    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: EditTicketPriceItem) => ({
        record,
        numeric: col.numeric,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  return (
    <Space className="py-5 w-full" direction="vertical">
      <PrimaryButton onClick={handleAdd}>
        Add ticket
      </PrimaryButton>
      <Table
        components={components}
        pagination={false}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </Space>
  )
}

export default EditTicketPriceTable
