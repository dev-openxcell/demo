const jwt = require('jsonwebtoken') 
const { v4: uuidv4 } = require('uuid')
const { User } = require('../modules/user')
const { ENV } = require('../utils/envLoader.util')
const { CODE, MESSAGE } = require('../utils/constant.util')
const { sendres, havingError } = require('../utils/sendres.util')
const { generateUserPayload } = require('../utils/createPayload.util')
const { createPassword, matchPassword } = require('../utils/encrypt.util')
const { registerValidate, loginValidation, profileValidation } = require('../utils/validator.util')

exports.registerUser = async (req, res) => {
  try{
    const { error, value } = registerValidate(req.body)

    if(error){ throw new Error(JSON.stringify({ code: CODE.validation, message: error.message })) }

    const { email, password, name, userType, contactNumber, contactEmail } = value

    const salt = uuidv4()

    const body = {
      email,
      password: createPassword(salt, password),
      salt,
      name, 
      userType, 
      contactEmail, 
      contactNumber
    }

    await User.create(body)

    sendres(201, {  }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

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

    const token = jwt.sign(payload, ENV.USER_SECRET, { expiresIn: '24h' })

    sendres(200, { token }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getProfile = async (req, res) => {
  try{
    let user = req.user.toJSON()

    delete user.password
    delete user.salt

    sendres(200, { user }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.editProfile = async (req, res) => {
  try{
    const { error, value } = profileValidation(req.body)

    if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

    const { name, contactNumber, contactEmail } = value

    const user = req.user

    user.name = name
    user.contactNumber = contactNumber
    user.contactEmail = contactEmail

    await user.save()

    sendres(200, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}