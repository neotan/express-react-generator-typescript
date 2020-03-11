require('./loadEnv') // Must be the first import
require('module-alias/register')
const app = require('~server')
const { logger } = require('~shared')

// Start the server
const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
  logger.info('Express server started on port: ' + port)
})
