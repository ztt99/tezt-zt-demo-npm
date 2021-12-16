#!/usr/bin/env node

const { readFileSync, existsSync, writeFileSync } = require('fs')
const { join } = require('path')
const yParser = require('yargs-parser')
const chalk = require('chalk')
const assert = require('assert')
const signale = require('signale')
console.log(1211212)
// print version and @local
const args = yParser(process.argv.slice(2))

// // Notify update when process exits
const updater = require('update-notifier')
const pkg = require('../package.json')

updater({ pkg }).notify({ defer: true })

const cwd = process.cwd()

if (args._.some((s) => s === 'browser')) {
  readPackage()
}

function readPackage() {
  const fileExt = ['.js', '.json']
  const packageContent = readFileSync(join(cwd, 'package.json'), 'utf-8')
  let browserconfigContent

  if (
    fileExt.some((ext) => {
      return (
        existsSync(join(cwd, `.browserconfig${ext}`)) &&
        (browserconfigContent = readFileSync(
          join(cwd, `.browserconfig${ext}`),
          'utf-8'
        ))
      )
    })
  ) {
    getBrowserContent(browserconfigContent)
  } else if (packageContent.browserconfig) {
    getBrowserContent(packageContent)
  } else {
    signale.error(
      new Error(
        `如果需要设置浏览器相关，请在package.json文件中配置browserconfig/.browserconfigjs`
      )
    )
    process.exit(0)
  }
}

function getBrowserContent(content) {
  let aaa = readFileSync(join(__dirname, '../', 'dist/index.js'), 'utf-8')
  aaa = aaa.replace(99999, content)
  writeFileSync('dist/index.js', aaa)
}
