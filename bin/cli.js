#!/usr/bin/env node

const path = require('path')
const yesno = require('yesno')
const program = require('commander')
const chalk = require('chalk')
const symbols = require('log-symbols')
const {version: VERSION, name: NAME} = require('../package')
const {around, before, createAppName, copyTemplateFiles, updateAppNameToPkgJson, isEmpty, updatePackages} = require('./util')

;(async function () {
  try {
    around(program, 'optionMissingArgument', function (wrappedFn, args) {
      program.outputHelp()
      wrappedFn.apply(this, args)
      return {args: [], unknown: []}
    })

    before(program, 'outputHelp', function () {
      // track if help was shown for unknown option
      this._isHelpShown = true
    })

    before(program, 'unknownOption', function () {
      // allow unknown option if help was shown, to prevent trailing error
      this._allowUnkownOption = this._isHelpShown

      // show help if not yet shown
      if (!this._isHelpShown) {
        program.outputHelp()
      }
    })

    program
      .name(NAME)
      .version(VERSION, '-V  --version', 'output the current version')
      .usage(
        `[options] [dir]
         or shorthanded:
         ergt [options] [dir]`,
      )
      .option('-t, --typescript', 'add TypeScript support')
      .option('-f, --force', 'force on non-empty directory')
      .parse(process.argv)

    // input relative path
    const inputPath = program.args.shift()
    const destPath = path.resolve(process.cwd(), inputPath)

    // app name
    const appName = createAppName(destPath) || 'express-app'
    console.log(chalk.green('Setting up new Express project...'))

    if (await isEmpty(destPath) || program.force) {
      await copyTemplateFiles(destPath, program.ts)
    } else {
      const ok = await yesno({
        question: 'Destination is not empty, continue? [y/N] ',
      })

      if (ok) {
        process.stdin.destroy()
        await copyTemplateFiles(destPath, program.ts)
      } else {
        console.error('Aborting')
        process.exit(1)
      }

    }
    updateAppNameToPkgJson(destPath, appName)

    console.log(chalk.green('Checking for latest package versions...'))
    const ok = await yesno({
      question: `
        \n${JSON.stringify(await updatePackages(destPath), null, 2)}
        \nDo you want to update these packages to listed latest versions? [y/N] `,
    })

    if (ok) {
      console.log(chalk.green('Updating package.json...'))
      await updatePackages(destPath, true)
      console.log(symbols.success, chalk.green('Updated package.json'))
    }

    console.log(symbols.success, chalk.green('Project setup complete!' +
      `\n\nPlease run ${chalk.yellow(`cd ${inputPath} && npm i && npm run dev`)} to start your application.`))
  } catch (err) {
    console.error(chalk.redBright(err))
  }
})()
