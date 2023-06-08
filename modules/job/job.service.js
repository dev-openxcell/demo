const { Application } = require('../../db/models/application')
const { Job } = require('../../db/models/job')

exports.createJob = async (body) => {
  await Job.create(body)
  return
}

exports.updateJob = async (jobId, body) => {
  await Job.findByIdAndUpdate(jobId, body)
  return
}

exports.getOneJob = async (jobId, projection) => {
  return await Job.findById(jobId, projection).lean()
}

exports.getJobs = async (query, projection={}, limit=10, skip, sortObj={ createdAt: -1 }) => {
  return await Job.find(query, projection).sort(sortObj).limit(limit).skip(skip).lean()
}

exports.createApplication = async (body) => {
  await Application.create(body)
  return
}

exports.getApplication = async (applicationId, projection) => {
  return await Application.findById(applicationId, projection)
    .populate({ path: 'jobId', select: '-creatorId -creatorName' })
    .populate({ path: 'applierId', select: 'email name contactNumber contactEmail resume' }).lean()
}

exports.getApplications = async (query, projection, limit, skip, sortObj = { createdAt: -1 }) => {
  return await Application.find(query, projection).sort(sortObj).limit(limit).skip(skip).lean()
}