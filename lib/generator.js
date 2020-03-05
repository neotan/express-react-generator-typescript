const path = require('path')
const editJsonFile = require('edit-json-file')
const childProcess = require('child_process')
const ncp = require('ncp').ncp

const config = require('./config')

async function genProject(destination, withAuth) {
  try {
    await copyProjectFiles(destination, withAuth)
    updatePackageJson(destination)
    const dep = getDepStrings(withAuth)
    downloadNodeModules(destination, dep)
  } catch (err) {
    console.error(err)
  }
}

function copyProjectFiles(destination, withAuth) {
  const prjFolder = withAuth
    ? '../templates/express-jest-eslint-typescript-auth'
    : '../templates/express-jest-eslint-typescript'
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

function getDepStrings(withAuth) {
  let dependencies = config.express_jest_eslint_typescript.pkgJson.dependencies
  let devDependencies = config.express_jest_eslint_typescript.pkgJson.devDependencies

  if (withAuth) {
    dependencies = dependencies.concat(config.express_jest_eslint_typescript.pkgJson.depAuth)
    devDependencies = devDependencies.concat(config.express_jest_eslint_typescript.pkgJson.devDepAuth)
  }

  dependencies = dependencies.join(' ')
  devDependencies = devDependencies.join(' ')

  return { dependencies, devDependencies }
}

function downloadNodeModules(destination, dep) {
  console.log('Executing `npm install`...')
  const options = { cwd: destination }
  childProcess.execSync('npm i -P ' + dep.dependencies, options)
  childProcess.execSync('npm i -D ' + dep.devDependencies, options)
}

module.exports = genProject
