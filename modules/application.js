const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: 'Job'
  },
  applierId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  employerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  jobTitle: {
    type: String,
  },
  applierName: {
    type: String
  },
  totalExperience: {
    type: Number
  },
  pastExperiences: [
    _id=false,
    {
      role: String,
      descripion: String,
      duration: Number
    }
  ],
  linkToResume: {
    type: String
  }
}, { timestamps: true, versionKey: false, skipVersioning: true, collection: 'applications' })

const Application = mongoose.model('Application', ApplicationSchema)
module.exports = { Application }