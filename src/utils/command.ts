import { Command } from '@tauri-apps/api/shell'
import { message } from 'antd'

export function getNodeVersion(cb: Function) {
  const command = new Command('node', ['--version'])
  command
    .execute()
    .then(data => cb(data.stdout))
    .catch(err => console.error('error', err))
}

export function getNpmVersion(cb: Function) {
  const npmCommand = new Command('npm-version', ['-g', '--version'])
  npmCommand
    .execute()
    .then(data => cb(data.stdout))
    .catch(err => console.error('error', err))
}

export function getPackageList(cb: Function) {
  const npmListCommand = new Command('npm-list', ['-g', 'list'])

  npmListCommand
    .execute()
    .then(data => cb(data.stdout))
    .catch(err => console.error('error', err))
}

function install(type: 'Install' | 'Upgrade', name: string, cb: Function) {
  const npmListCommand = new Command('npm', ['-g', 'install', name])

  message.success(`${type} ${name}...`)

  npmListCommand
    .execute()
    .then(data => cb(name, data.stdout))
    .catch(err => console.error('error', 'install', name, err))
}

export function installPackage(name: string, cb: Function) {
  install('Install', name, (name: string, stdout: string) => {
    message.success(`${name} installed`)
    cb(stdout)
  })
}

export function upgradePackage(name: string, cb: Function) {
  console.log(name)
  install('Upgrade', name, (name: string, stdout: string) => {
    message.success(`${name} upgraded`)
    cb(stdout)
  })
}

export function removePackage(name: string, cb: Function) {
  const npmListCommand = new Command('npm', ['-g', 'remove', name])

  npmListCommand
    .execute()
    .then(data => {
      message.success(`${name} removed`)
      cb(data.stdout)
    })
    .catch(err => console.error('error', 'remove', name, err))
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
