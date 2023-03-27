import { useState } from 'react'
import { getNodeVersion, getNpmVersion, getPackageList } from '../utils/command'

export const useApp = () => {
  const [nodeVersion, setNodeVersion] = useState('')
  getNodeVersion().then(version => setNodeVersion(version))

  const [npmVersion, setNpmVersion] = useState('')
  getNpmVersion().then(version => setNpmVersion(version))

  const [packageStr, setPackageStr] = useState('')

  async function updatePackageList() {
    const data = await getPackageList()
    setPackageStr(data)
    return data
  }

  return {
    nodeVersion,
    npmVersion,
    packageStr,
    updatePackageList,
  }
}
