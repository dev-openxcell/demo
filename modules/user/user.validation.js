const { CODE } = require('../../utils/constant')
const { registerValidate, loginValidation, profileValidation } = require('../../utils/validator')

const validationClosure = (validation, body) => {
  const { error, value } = validation(body)

  if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

  return value
}

exports.createUserValidation = (body) => {
  return validationClosure(registerValidate, body)
}

exports.loginValidation = (body) => {
  return validationClosure(loginValidation, body)
}

exports.editProfileValidation = (body) => {
  return validationClosure(profileValidation, body)
}