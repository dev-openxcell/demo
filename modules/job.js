const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  creatorName: {
    type: String
  },
  minimumExperience: {
    type: Number,
    max: [50, 'minimum experince cannot be greater than 50']
  },
  jobTitle: {
    type: String
  },
  jobDescrpition: {
    type: String
  },
  isCommitmentRequired: {
    type: Boolean,
    default: false
  },
  minimumJobCommitment: {
    type: Number,
    default: 0
  },
  paymentType: {
    type: String,
    enum: ['HOURLY', 'MONTHLY']
  },
  salary: {
    type: Number,
    max: [10000000, "salary cap hit"]
  }
}, { timestamps: true, versionKey: false, skipVersioning: true, collection: 'jobs' })

const Job = mongoose.model('Job', JobSchema)
module.exports = { Job }