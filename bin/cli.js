#!/usr/bin/env node

const path = require('path')
const expressGenTs = require('./generator')

let destination
let appName = 'my-app'
let withTs = false
if (process.argv[2] === '-ts') {
  appName = process.argv[3] || appName
  withTs = true
  destination = getDest(appName)
} else {
  appName = process.argv[2] || appName
  destination = getDest(appName)
}

console.log('Setting up new Express project...')

expressGenTs(destination, withTs).then(() => {
  console.log(`
  Project setup complete!
  Please run 'cd ${appName} && npm i && npm run dev' to start your application.
  `)
})

function getDest(destFolder) {
  destFolder = destFolder || appName
  return path.join(process.cwd(), destFolder)
}
