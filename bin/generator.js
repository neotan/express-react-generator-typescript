const path = require('path')
const yesno = require('yesno')
const program = require('commander')
const {version: VERSION, name: NAME} = require('../package')
const {around, before, createAppName, copyTemplateFiles, updateAppNameToPkgJson, isEmpty} = require('./util')

async function genProject() {
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
      .option('-t, --ts', 'add TypeScript support')
      .option('    --git', 'add .gitignore')
      .option('-f, --force', 'force on non-empty directory')
      .parse(process.argv)

    // input relative path
    const destPath = path.resolve(process.cwd(), program.args.shift())

    // app name
    const appName = createAppName(destPath) || 'express-app'

    if (await isEmpty(destPath)) {
      copyTemplateFiles(destPath, program.ts)
    } else {
      const ok = await yesno({
        question: 'Destination is not empty, continue?',
      })

      if (ok) {
        process.stdin.destroy()
        copyTemplateFiles(destPath, program.ts)
      } else {
        console.error('Aborting')
        process.exit(1)
      }

      updateAppNameToPkgJson(destPath, appName)
    }

  } catch (err) {
    console.error(err)
  }
}

module.exports = genProject
