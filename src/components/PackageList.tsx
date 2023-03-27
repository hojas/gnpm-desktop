import { Space, Button, Table } from 'antd'
import {
  upgradePackage,
  removePackage,
  parsePackageList,
} from '../utils/command'

interface Package {
  name: string
  version: string
}

export function PackageList({
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
            Upgrade
          </Button>
        ) : (
          <Space>
            <Button type="primary" onClick={() => onInstall(record.name)}>
              Upgrade
            </Button>
            <Button type="primary" danger onClick={() => onRemove(record.name)}>
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
