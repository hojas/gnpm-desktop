import { ReactNode } from 'react'
import { Layout } from 'antd'
import SideMenu from './SideMenu'

const { Header, Content } = Layout

interface Props {
  header: ReactNode
  children: ReactNode
  selectMenu: Function
}

export default function BaseLayout({ header, children, selectMenu }: Props) {
  return (
    <Layout className="h-[100%] bg-[#f5f5f5] overflow-hidden">
      <SideMenu selectMenu={selectMenu} />
      <Layout>
        <Header className="px-[10px] bg-white">{header}</Header>
        <Content className="px-[10px] mt-[10px] bg-white overflow-y-auto">{children}</Content>
      </Layout>
    </Layout>
  )
}
