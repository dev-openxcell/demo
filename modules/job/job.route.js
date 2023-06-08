const jobRouter = require('express').Router()
const multer = require('multer')
const controller = require('./job.controller')
const middleware = require('./job.middleware')
const { loadJob } = require('../../middleware/loadJob.middleware')
const { loadApplication } = require('../../middleware/loadApplication.middleware')

jobRouter.param('jobId', loadJob)
jobRouter.param('applicationId', loadApplication)

jobRouter.post('/jobs', controller.createJob)
jobRouter.get('/jobs', controller.getJobs)
jobRouter.get('/jobs/:jobId', controller.getJob)
jobRouter.put('/jobs/:jobId', controller.editJob)

jobRouter.post('/apply/:jobId', controller.apply)
jobRouter.get('/applied', controller.getApplied)

jobRouter.get('/applications/:jobId', controller.getApplications)
jobRouter.get('/application/:applicationId', controller.getApplication)

const uploadRoutes = [
  multer().single('file'),
  middleware.checkFileExtension,
  controller.uploadFile
]
jobRouter.post('/upload', uploadRoutes)

module.exports = jobRouter