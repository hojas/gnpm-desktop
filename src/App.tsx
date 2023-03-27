import 'antd/dist/reset.css'
import { useEffect } from 'react'
import BaseLayout from './components/BaseLayout'
import Header from './components/Header'
import { PackageList } from './components/PackageList'
import { useApp } from './hooks/useApp'

export default function App() {
  const { nodeVersion, npmVersion, packageStr, updatePackageList } = useApp()

  useEffect(() => {
    updatePackageList()
  }, [])

  return (
    <BaseLayout
      header={
        <Header
          nodeVersion={nodeVersion}
          npmVersion={npmVersion}
          updatePackageList={updatePackageList}
        />
      }
    >
      <PackageList
        packageStr={packageStr}
        onUpdatePackageList={updatePackageList}
      />
    </BaseLayout>
  )
}
