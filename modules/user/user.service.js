const { User } = require('../../db/models/user')

exports.createUser = (body) => {
  return User.create(body)
}

exports.getUser = (query, projection = {}) => {
  return User.findOne(query, projection).lean()
}

exports.getUserHydrated = (query, projection = {}) => {
  return User.findOne(query, projection)
}
