const router = require('express').Router()
const userRouter = require('./user.routes')
const jobRouter = require('./job.routes')

router.use('/', userRouter)
router.use('/', jobRouter)

module.exports = router