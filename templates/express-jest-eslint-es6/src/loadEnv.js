const dotenv = require('dotenv')
const commandLineArgs = require('command-line-args')

// Setup command line options
const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: process.env.NODE_ENV || 'test',
    type: String,
  },
])

// Set the env file
const result = dotenv.config({
  path: `./env/${options.env}.env`,
})
if (result.error) {
  throw result.error
}
