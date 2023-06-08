const userRouter = require('express').Router()
const controller = require('./user.controller')

userRouter.post('/register', controller.registerUser)
userRouter.post('/login', controller.login)
userRouter.get('/profile', controller.getProfile)
userRouter.put('/profile', controller.editProfile)

module.exports = userRouter