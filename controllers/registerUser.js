const { v4: uuidv4 } = require('uuid')
const { createPassword } = require('../utils/encrypt')
const { User } = require('../modules/user')
const { sendres, havingError } = require('../utils/sendres')
const { registerValidate } = require('../utils/validator')
const { CODE } = require('../utils/constant')

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