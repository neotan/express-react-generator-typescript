#!/usr/bin/env

const createApp = require('./generator')

console.log('-------------- Setting up new Express project... ----------------')

createApp().then((x) => {
  console.log(`
  Project setup complete!
  Please run 'cd xxxx && npm i && npm run dev' to start your application.
  `)
})
