import { Space, Button, Table } from 'antd'
import { upgradePackage, removePackage, parsePackageList } from '../utils/command'

interface Package {
  name: string
  version: string
}

interface BtnProps {
  name: string
  cb: Function
}

function UpgradeBtn({ name, cb }: BtnProps) {
  return (
    <Button type="primary" onClick={() => upgradePackage(name, cb)}>
      Upgrade
    </Button>
  )
}

function RemoveBtn({ name, cb }: BtnProps) {
  return (
    <Button type="primary" danger onClick={() => removePackage(name, cb)}>
      Remove
    </Button>
  )
}

export function PackageList({
  packageStr,
  onUpdatePackageList,
}: {
  packageStr: string
  onUpdatePackageList: Function
}) {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: any, record: Package) => {
        return ['npm', 'corepack'].includes(record.name) ? (
          <UpgradeBtn name={record.name} cb={onUpdatePackageList} />
        ) : (
          <Space>
            <UpgradeBtn name={record.name} cb={onUpdatePackageList} />
            <RemoveBtn name={record.name} cb={onUpdatePackageList} />
          </Space>
        )
      },
    },
  ]

  const packageList = parsePackageList(packageStr)

  return (
    <Table className="mt-4" dataSource={packageList} columns={columns} bordered />
  )
}
