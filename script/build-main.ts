/**
 * electron 打包
 */
import { join } from 'path'
import { spawn, ChildProcess } from 'child_process'
import { watch, rollup, OutputOptions } from 'rollup'
import minimist from 'minimist'
import chalk from 'chalk'
import ora from 'ora'
import electron from 'electron'
import { waitOn } from './utils'
import options from './rollup.config'
import { main } from '../package.json'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '../.env') })

const argv = minimist(process.argv.slice(2))
const opts = options(argv.env)
const TAG = '[build-main.ts]'
const spinner = ora(`${TAG} Electron build...`)
process.env.NODE_ENV = argv.env

if (argv.watch) {
  waitOn({ port: process.env.PORT as string }).then(msg => {
    const watcher = watch(opts)
    let child: ChildProcess
    watcher.on('change', filename => {
      const log = chalk.green(`change -- ${filename}`)
      console.log(TAG, log)
    })
    watcher.on('event', ev => {
      if (ev.code === 'END') {
        if (child) child.kill()
        child = spawn(electron as any, [join(__dirname, `../${main}`)], { stdio: 'inherit' })
      } else if (ev.code === 'ERROR') {
        console.log(ev.error)
      }
    })
  })
} else {
  spinner.start()
  rollup(opts)
    .then(build => {
      fs.mkdirSync(join(__dirname, '../dist/main/'))
      spinner.stop()
      console.log(TAG, chalk.green('Electron build success.'))
      build.write(opts.output as OutputOptions)
    })
    .catch(error => {
      spinner.stop()
      console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n')
    })
}
