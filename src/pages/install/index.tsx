import { useState } from 'react'
import { Button, Input, Table } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { search } from '../../utils/api/search'
import { installPackage } from '../../utils/command'

const { Search } = Input

const onInstall = (name: string) => installPackage(name)

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    render: (_: any, record: any) => record.author?.name,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => {
      return (
        <Button type="primary" onClick={() => onInstall(record.name)}>
          <DownloadOutlined />
          Install
        </Button>
      )
    },
  },
]

export const Install = () => {
  const [list, setList] = useState([])

  const onSearch = async (name: string) => {
    const { ok, data } = await search({
      text: name,
    })
    if (ok) {
      setList(data.objects.map((p: any) => p.package))
    }
  }

  return (
    <>
      <Search
        className="my-[10px]"
        placeholder="input package name"
        allowClear
        enterButton
        onSearch={onSearch}
      />
      <Table bordered columns={columns} dataSource={list} />
    </>
  )
}
