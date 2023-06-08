const crypto = require('node:crypto')

exports.createPassword = (salt, password) => {
  return crypto.createHmac('sha256', salt).update(password).digest('utf-8')
}

exports.matchPassword = (salt, providedPassword, password) => {
  return crypto.createHmac('sha256', salt).update(providedPassword).digest('utf-8') === password
}