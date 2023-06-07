const { User } = require('../modules/user')
const { Job } = require('../modules/job')
const { Application } = require('../modules/application')
const mongoose = require('mongoose')

exports.clearDb = async () => {
  await User.deleteMany({})
  await Job.deleteMany({})
  await Application.deleteMany({})

  mongoose.connection.close()
}