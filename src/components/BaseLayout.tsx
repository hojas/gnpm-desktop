import React, { ReactNode } from 'react'
import { Layout } from 'antd'

const { Header, Content } = Layout

interface Props {
  header: ReactNode
  children: ReactNode
}

const BaseLayout: React.FC<Props> = ({ header, children }) => (
  <Layout className="bg-[#f5f5f5]">
    <Header>{header}</Header>
    <Content className="px-[50px]">{children}</Content>
  </Layout>
)

export default BaseLayout
