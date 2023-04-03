import { Space, Button, Table } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  upgradePackage,
  removePackage,
  parsePackageList,
} from '../../utils/command'

interface Package {
  name: string
  version: string
}

export function Packages({
  packageStr,
  onUpdatePackageList,
}: {
  packageStr: string
  onUpdatePackageList: Function
}) {
  const onInstall = async (name: string) => {
    const success = await upgradePackage(name)
    success && onUpdatePackageList()
  }

  const onRemove = async (name: string) => {
    const success = await removePackage(name)
    success && onUpdatePackageList()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      width: 120,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Package) => {
        return ['npm', 'corepack'].includes(record.name) ? (
          <Button type="primary" onClick={() => onInstall(record.name)}>
            <UploadOutlined />
            Upgrade
          </Button>
        ) : (
          <Space>
            <Button type="primary" onClick={() => onInstall(record.name)}>
              <UploadOutlined />
              Upgrade
            </Button>
            <Button type="primary" danger onClick={() => onRemove(record.name)}>
              <DeleteOutlined />
              Remove
            </Button>
          </Space>
        )
      },
    },
  ]

  const packageList = parsePackageList(packageStr)

  return (
    <Table
      className="mt-4"
      dataSource={packageList}
      columns={columns}
      bordered
    />
  )
}
