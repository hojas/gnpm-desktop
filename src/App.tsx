import 'antd/dist/reset.css'
import { useState, useEffect } from 'react'
import BaseLayout from './components/BaseLayout'
import Header from './components/Header'
import { Packages } from './pages/packages'
import { Install } from './pages/install'
import { useApp } from './hooks/useApp'

export default function App() {
  const [page, setPage] = useState('packages')
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
      selectMenu={setPage}
    >
      {page === 'packages' && (
        <Packages
          packageStr={packageStr}
          onUpdatePackageList={updatePackageList}
        />
      )}
      {page === 'install' && <Install />}
    </BaseLayout>
  )
}
