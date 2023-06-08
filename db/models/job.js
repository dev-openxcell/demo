const mongoose = require('mongoose')
const { ENUMS, ENUMS_ARR, MODELS } = require('../../utils/constant')

const JobSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: MODELS.USER
  },
  creatorName: {
    type: String,
    required: [true, 'specify the creatorName'],
  },
  minimumExperience: {
    type: Number,
    max: [50, 'minimum experince cannot be greater than 50']
  },
  jobTitle: {
    type: String,
    required: [true, 'jobTitle is required'],
  },
  jobDescrpition: {
    type: String,
    required: [true, 'jobDescription is required'],
  },
  isCommitmentRequired: {
    type: Boolean,
    default: false
  },
  minimumJobCommitment: {
    type: Number,
    default: 0,
    required: (() => {
      this.isCommitmentRequired ? true : false
    })()
  },
  paymentType: {
    type: String,
    enum: ENUMS_ARR.PAYMENT_TYPE,
    default: ENUMS.MONTHLY
  },
  salary: {
    type: Number,
    max: [10000000, "salary cap hit"],
    required: [true, 'salary is required']
  }
}, { timestamps: true, versionKey: false, skipVersioning: true, collection: 'jobs' })

const Job = mongoose.model(MODELS.JOB, JobSchema)
module.exports = { Job }