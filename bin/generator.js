const path = require('path')
const fs = require('fs')
const editJsonFile = require('edit-json-file')
const childProcess = require('child_process')
const ncp = require('ncp').ncp

async function genProject(destination, withTs) {
  try {
    await copyProjectFiles(destination, withTs)
    updatePackageJson(destination)
    // downloadNodeModules(destination, dep)
  } catch (err) {
    console.error(err)
  }
}

const getIgnoredFileRegexes = () => {
  let fileNames
  try {
    fileNames = fs
      .readFileSync(__dirname + '/../.gitignore')
      .toString()
      .trim()
      .split('\n')
  } catch (e) {
    console.error(e)
    fileNames = ['.DS_Store', 'node_modules', 'npm-debug.log']
  }

  return fileNames.map(name => new RegExp(name.trim().replace('*', '') + '$'))
}

const filter = ignoredFileRegexes => pathFileName => {
  return !ignoredFileRegexes.some(regex => regex.test(pathFileName))
}

function copyProjectFiles(destination, withTs) {
  const prjFolder = withTs ? '../templates/express-jest-eslint-ts' : '../templates/express-jest-eslint-es6'
  const source = path.join(__dirname, prjFolder)
  const ignoreFileRegexes = getIgnoredFileRegexes()

  return new Promise((resolve, reject) => {
    ncp.limit = 16
    ncp(source, destination, { filter: filter(ignoreFileRegexes) }, function(err) {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

function updatePackageJson(destination) {
  let file = editJsonFile(destination + '/package.json', {
    autosave: true,
  })
  file.set('name', path.basename(destination))
}

function downloadNodeModules(destination, dep) {
  console.log('Executing `npm install`...')
  const options = { cwd: destination }
  childProcess.execSync('npm i ' + dep.dependencies, options)
  childProcess.execSync('npm i -D ' + dep.devDependencies, options)
}

module.exports = genProject
