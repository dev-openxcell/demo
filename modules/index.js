const mainRouter = require('express').Router()

mainRouter.use('/', require('../auth/isAuthenticated').isAuthenticated)
mainRouter.use('/', require('./user/user.route'))
mainRouter.use('/', require('./job/job.route'))

module.exports = mainRouter