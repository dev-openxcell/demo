const { registerValidate, loginValidation, profileValidation, validationHelper } = require('../../utils/validator')

exports.createUserValidation = (body) => {
  return validationHelper(registerValidate, body)
}

exports.loginValidation = (body) => {
  return validationHelper(loginValidation, body)
}

exports.editProfileValidation = (body) => {
  return validationHelper(profileValidation, body)
}