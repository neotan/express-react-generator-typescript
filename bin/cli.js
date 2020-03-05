#!/usr/bin/env node

const path = require('path')
const expressGenTs = require('../lib/generator')

let destination
let appName = 'my-app'
let withAuth = false
if (process.argv[2] === '--with-auth') {
  appName = process.argv[3] || appName
  withAuth = true
  destination = getDest(process.argv[3])
} else {
  appName = process.argv[2] || appName
  destination = getDest(process.argv[2])
}

console.log('Setting up new Express/TypeScript project...')

expressGenTs(destination, withAuth).then(() => {
  console.log(`
  Project setup complete!
  Please run 'cd ${appName} && npm run dev' to start your application.
  `)
})

function getDest(destFolder) {
  destFolder = destFolder || 'express-ts-prj'
  return path.join(process.cwd(), destFolder)
}
