import { Layout, Menu, MenuProps } from 'antd'
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons'

const { Sider } = Layout

const menuItems: MenuProps['items'] = [
  {
    key: 'packages',
    icon: <InboxOutlined />,
    label: 'Packages',
  },
  {
    key: 'install',
    icon: <DownloadOutlined />,
    label: 'Install',
  },
]

export default function SideMenu({ selectMenu }: { selectMenu: Function }) {
  return (
    <Sider className="w-[200px] h-[100%]">
      <div className="flex items-center justify-center h-[32px] m-[16px] text-gray-50 bg-white/[.1]">
        gnpm
      </div>
      <Menu
        defaultSelectedKeys={['packages']}
        mode="inline"
        theme="dark"
        items={menuItems}
        onClick={({ key }) => selectMenu(key)}
      />
    </Sider>
  )
}
