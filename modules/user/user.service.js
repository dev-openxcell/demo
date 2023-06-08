const { User } = require('../../db/models/user')

exports.createUser = async (body) => {
  await User.create(body)
  return
}

exports.getUser = async (query, projection = {}) => {
  return await User.findOne(query, projection).lean()
}
