const router = require('express').Router()
const { checkUser } = require('../middleware/checkUser.middleware')
const { registerUser, login, editProfile, getProfile } = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', login)

router.get('/profile', checkUser, getProfile)
router.put('/profile', checkUser, editProfile)

module.exports = router