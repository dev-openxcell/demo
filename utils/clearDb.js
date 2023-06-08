const { User } = require('../db/models/user')
const { Job } = require('../db/models/job')
const { Application } = require('../db/models/application')
const mongoose = require('mongoose')

exports.clearDb = async () => {
  await User.deleteMany({})
  await Job.deleteMany({})
  await Application.deleteMany({})

  mongoose.connection.close()
}