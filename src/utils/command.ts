import { Command } from '@tauri-apps/api/shell'
import { message } from 'antd'
import { cat } from 'shelljs'

// 获取 Node.js 版本
export async function getNodeVersion() {
  const command = new Command('node', ['--version'])

  try {
    const res = await command.execute()
    return res.stdout
  } catch (err: any) {
    message.error(err)
    return ''
  }
}

// 获取 npm 版本
export async function getNpmVersion() {
  const command = new Command('npm-version', ['-g', '--version'])

  try {
    const res = await command.execute()
    return res.stdout
  } catch (err: any) {
    message.error(err)
    return ''
  }
}

// 列出已安装 npm 包
export async function getPackageList() {
  const command = new Command('npm-list', ['-g', 'list'])

  try {
    const res = await command.execute()
    return res.stdout
  } catch (err: any) {
    message.error(err)
    return ''
  }
}

// 安装 or 更新 npm 包
async function install(type: 'install' | 'upgrade', name: string) {
  message.success(`${type} ${name}...`)

  const command = new Command('npm-global', ['-g', 'install', name])
  try {
    await command.execute()
    message.success(`${name} ${type}${type === 'install' ? 'ed' : 'd'}`)
    return true
  } catch (err: any) {
    message.error(err)
    return false
  }
}

// 安装 npm 包
export function installPackage(name: string) {
  return install('install', name)
}

// 更新 npm 包
export function upgradePackage(name: string) {
  return install('upgrade', name)
}

// 删除 npm 包
export async function removePackage(name: string) {
  const command = new Command('npm-global', ['-g', 'remove', name])

  try {
    await command.execute()
    message.success(`${name} removed`)
    return true
  } catch (err: any) {
    message.error(err)
    return false
  }
}

export function parsePackageList(str: string) {
  const reg = /(@[\w-]+\/)?[\w-]+@(\d+\.){2}\d+/g

  const res = []
  let r = null
  while ((r = reg.exec(str))) {
    res.push(r[0])
  }

  return res.map((pkg, key) => {
    const content = pkg.split('@')
    const len = content.length
    return {
      key,
      name: len === 3 ? '@' + content[1] : content[0],
      version: len === 3 ? content[2] : content[1],
    }
  })
}
