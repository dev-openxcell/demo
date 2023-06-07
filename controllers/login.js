const { matchPassword } = require('../utils/encrypt')
const { User } = require('../modules/user')
const { sendres, havingError } = require('../utils/sendres')
const jwt = require('jsonwebtoken')
const { generateUserPayload } = require('../utils/createPayload')
const { ENV } = require('../utils/envLoader')
const { loginValidation } = require('../utils/validator')
const { CODE, MESSAGE } = require('../utils/constant')

exports.login = async (req, res) => {
  try{
    const { error, value } = loginValidation(req.body)

    if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

    const { email, password } = value

    const user = await User.findOne({ email }).lean()

    if(!user) return sendres(404, { message: MESSAGE.NOT_REGISTERED }, res)

    const salt = user.salt

    if(!matchPassword(salt, password, user.password)) return sendres(401, { message: MESSAGE.PASSWORD_FAIL }, res)

    const payload = generateUserPayload(user)

    const token = jwt.sign(payload, ENV.USER_SECRET, { expiresIn: '6m' })

    sendres(200, { token }, res)
  }
  catch(err){
    havingError(err, res)
  }
}