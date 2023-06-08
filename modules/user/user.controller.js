const { v4: uuidv4 } = require('uuid')
const service = require('./user.service')
const validation = require('./user.validation')
const { MESSAGE } = require('../../utils/constant')
const { sendres, havingError } = require('../../utils/sendres')
const { createToken } = require('../../auth/isAuthenticated')
const { createPassword, matchPassword } = require('../../utils/encrypt')

exports.registerUser = async (req, res) => {
  try{
    const value = validation.createUserValidation(req.body)

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

    service.createUser(body)

    sendres(201, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.login = async (req, res) => {
  try{
    const value = validation.loginValidation(req.body) 

    const { email, password } = value

    const user = await service.getUser({ email }, {})

    if(!user) return sendres(404, { message: MESSAGE.NOT_REGISTERED }, res)

    const salt = user.salt

    if(!matchPassword(salt, password, user.password)) return sendres(401, { message: MESSAGE.PASSWORD_FAIL }, res)

    const token = createToken(user)

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
    const value = validation.editProfileValidation(req.body)

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