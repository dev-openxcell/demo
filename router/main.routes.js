const router = require('express').Router()
const mainRouter = require('./user.routes')

router.use('/', mainRouter)

module.exports = router