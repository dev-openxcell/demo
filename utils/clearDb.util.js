const { User } = require('../modules/user')
const { Job } = require('../modules/job')
const { Applier } = require('../modules/applier')
const mongoose = require('mongoose')

exports.clearDb = async () => {
  await User.deleteMany({})
  await Job.deleteMany({})
  await Applier.deleteMany({})

  mongoose.connection.close()
}