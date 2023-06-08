const { CODE } = require('../../utils/constant')
const { applicationValidation, jobValidation } = require('../../utils/validator')


const validationClosure = (validation, body) => {
  const { error, value } = validation(body)

  if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

  return value
}

exports.JobValidation = (body) => {
  return validationClosure(jobValidation, body)
}

exports.ApplicationValidation = (body) => {
  return validationClosure(applicationValidation, body)
}