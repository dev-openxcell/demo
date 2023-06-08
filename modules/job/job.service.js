const { Application } = require('../../db/models/application')
const { Job } = require('../../db/models/job')

exports.createJob =  (body) => {
  return Job.create(body)
}

exports.updateJob = (jobId, body) => {
  return Job.findByIdAndUpdate(jobId, body)
}

exports.getOneJob = (jobId, projection) => {
  return  Job.findById(jobId, projection).lean()
}

exports.getJobs = (query, projection={}, limit=10, skip, sortObj={ createdAt: -1 }) => {
  return Job.find(query, projection).sort(sortObj).limit(limit).skip(skip).lean()
}

exports.createApplication = (body) => {
  return Application.create(body)
}

exports.getApplication = (applicationId, projection) => {
  return Application.findById(applicationId, projection)
    .populate({ path: 'jobId', select: '-creatorId -creatorName' })
    .populate({ path: 'applierId', select: 'email name contactNumber contactEmail resume' }).lean()
}

exports.getApplications = (query, projection, limit, skip, sortObj = { createdAt: -1 }) => {
  return Application.find(query, projection).sort(sortObj).limit(limit).skip(skip).lean()
}