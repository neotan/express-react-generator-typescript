const path = require('path')
const fs = require('fs')
const util = require('util')
const editJsonFile = require('edit-json-file')
const ncp = require('ncp').ncp
const ignore = require('ignore')

function around(obj, wrappedFnName, cb) {
  const wrappedFn = obj[wrappedFnName]

  obj[wrappedFnName] = function () {
    const args = Array.from(arguments)
    return cb.call(this, wrappedFn, args)
  }
}

function before(obj, laterFnName, priorFn) {
  const laterFn = obj[laterFnName]

  obj[laterFnName] = function () {
    priorFn.call(this)
    laterFn.apply(this, arguments)
  }
}

function createAppName(pathName) {
  return path.basename(pathName) // for case: 'ergt my/input/app/path'
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase()
}

function copyTemplateFiles(destPath, withTs) {
  const templatePath = withTs ? '../templates/express-jest-eslint-ts' : '../templates/express-jest-eslint-es6'
  const srcPath = path.join(__dirname, templatePath)

  return copyFiles(srcPath, destPath)
}

function getIgnoredFilePatterns() {
  let patterns
  try {
    patterns = fs
      .readFileSync(__dirname + '/../.gitignore')
      .toString()
      .trim()
      .split('\n')
  } catch (e) {
    patterns = ['.DS_Store', 'node_modules', 'npm-debug.log']
  }
  return patterns
}

function copyFiles(srcPath, destPath) {
  const filter = absPath => {
    return !ignore().add(getIgnoredFilePatterns()).ignores(path.relative('.', absPath))
  }

  return new Promise((resolve, reject) => {
    ncp.limit = 16
    ncp(srcPath, destPath, {filter}, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })

}

function updateAppNameToPkgJson(destination, appName) {
  const file = editJsonFile(path.resolve(destination, 'package.json'), {autosave: true})
  file.set('name',appName)
}

function isEmpty(destPath) {
  return util.promisify(fs.readdir)(destPath).then(files => {
    return !files || !files.length
  }).catch(err => {
    if (err && err.code === 'ENOENT') return true
  })
}

module.exports = {
  around,
  before,
  createAppName,
  copyTemplateFiles,
  getIgnoredFilePatterns,
  copyFiles,
  updateAppNameToPkgJson,
  isEmpty,
}
