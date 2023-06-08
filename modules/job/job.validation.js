const { applicationValidation, jobValidation, validationHelper } = require('../../utils/validator')

exports.JobValidation = (body) => {
  return validationHelper(jobValidation, body)
}

exports.ApplicationValidation = (body) => {
  return validationHelper(applicationValidation, body)
}