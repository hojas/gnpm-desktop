import { Button, message, Space } from 'antd'

export default function Header({
  nodeVersion,
  npmVersion,
  updatePackageList,
}: {
  nodeVersion: string
  npmVersion: string
  updatePackageList: Function
}) {
  function onRefresh() {
    updatePackageList()
    return message.success('Package list updated')
  }

  return (
    <div className="flex items-center justify-between">
      <Button type="primary" onClick={onRefresh}>
        Refresh
      </Button>
      <Space>
        <Button type="primary">Node.js version: {nodeVersion}</Button>
        <Button type="primary">npm version: {npmVersion}</Button>
      </Space>
    </div>
  )
}
