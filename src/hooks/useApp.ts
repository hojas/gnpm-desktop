import { useState } from 'react'
import { getNodeVersion, getNpmVersion, getPackageList } from '../utils/command'

export const useApp = () => {
  const [nodeVersion, setNodeVersion] = useState('')
  getNodeVersion((version: string) => setNodeVersion(version))

  const [npmVersion, setNpmVersion] = useState('')
  getNpmVersion((version: string) => setNpmVersion(version))

  const [packageStr, setPackageStr] = useState('')

  function updatePackageList() {
    getPackageList((str: string) => setPackageStr(str))
  }

  return {
    nodeVersion,
    npmVersion,
    packageStr,
    updatePackageList,
  }
}
