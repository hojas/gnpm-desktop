import { Button, message, Space } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

interface Props {
  nodeVersion: string
  npmVersion: string
  updatePackageList: Function
}

export default function Header({
  nodeVersion,
  npmVersion,
  updatePackageList,
}: Props) {
  async function onRefresh() {
    const data = await updatePackageList()
    data && message.success('Package list updated')
  }

  return (
    <div className="flex items-center justify-between">
      <Button type="primary" onClick={onRefresh}>
        <ReloadOutlined />
        Refresh
      </Button>
      <Space>
        <Button>Node.js version: {nodeVersion}</Button>
        <Button>npm version: {npmVersion}</Button>
      </Space>
    </div>
  )
}
