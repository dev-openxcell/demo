const mongoose = require('mongoose')
const { MODELS } = require('../../utils/constant')

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: MODELS.JOB
  },
  applierId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: MODELS.USER
  },
  employerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: MODELS.USER
  },
  jobTitle: {
    type: String,
    required: [true, 'jobTitle is required']
  },
  applierName: {
    type: String,
  },
  totalExperience: {
    type: Number,
    required: [true, 'totalExperience is required']
  },
  pastExperiences: [
    _id=false,
    {
      role: String,
      description: String,
      duration: Number
    }
  ],
  linkToResume: {
    type: String
  }
}, { timestamps: true, versionKey: false, skipVersioning: true, collection: 'applications' })

const Application = mongoose.model(MODELS.APPLICATION, ApplicationSchema)
module.exports = { Application }