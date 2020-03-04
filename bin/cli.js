#!/usr/bin/env node

const path = require('path')
const expressGenTs = require('../lib/generator')

let destination
let withAuth = false
if (process.argv[2] === '--with-auth') {
  withAuth = true
  destination = getDest(process.argv[3])
} else {
  destination = getDest(process.argv[2])
}

console.log('Setting up new Express/TypeScript project...')

expressGenTs(destination, withAuth).then(() => {
  console.log('Project setup complete!')
})

function getDest(destFolder) {
  destFolder = destFolder || 'express-ts-prj'
  return path.join(process.cwd(), destFolder)
}
