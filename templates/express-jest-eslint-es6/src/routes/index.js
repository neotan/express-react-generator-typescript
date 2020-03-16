const { Router } = require('express')
const UserRouter = require('./users')

// Init router and path
const router = Router()

// Add sub-routes
router.use('/users', UserRouter)

// Export the base-router
module.exports = router
