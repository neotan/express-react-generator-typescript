const path = require('path')
const editJsonFile = require('edit-json-file')
const childProcess = require('child_process')
const ncp = require('ncp').ncp

const { express_es6, express_ts } = require('./config')

async function genProject(destination, withTs) {
  try {
    await copyProjectFiles(destination, withTs)
    updatePackageJson(destination)
    // const dep = getDepStrings(withTs)
    // downloadNodeModules(destination, dep)
  } catch (err) {
    console.error(err)
  }
}

function copyProjectFiles(destination, withTs) {
  const prjFolder = withTs ? './templates/express-jest-eslint-ts' : './templates/express-jest-eslint-es6'
  const source = path.join(__dirname, prjFolder)

  return new Promise((resolve, reject) => {
    ncp.limit = 16
    ncp(source, destination, function(err) {
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

function getDepStrings(withTs) {
  let deps = express_es6.pkgJson.dependencies
  let devDeps = express_es6.pkgJson.devDependencies

  if (withTs) {
    deps = deps.concat(express_ts.pkgJson.dependencies)
    devDeps = devDeps.concat(express_ts.pkgJson.devDependencies)
  }

  deps = deps.join(' ')
  devDeps = devDeps.join(' ')

  console.log({withTs, deps, devDeps})
  return { dependencies: deps, devDependencies: devDeps }
}

function downloadNodeModules(destination, dep) {
  console.log('Executing `npm install`...')
  const options = { cwd: destination }
  childProcess.execSync('npm i -P ' + dep.dependencies, options)
  childProcess.execSync('npm i -D ' + dep.devDependencies, options)
}

module.exports = genProject
