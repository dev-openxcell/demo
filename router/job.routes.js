const router = require('express').Router()
const multer = require('multer')
const { checkUser } = require('../middleware/checkUser.middleware')
const { loadJob } = require('../middleware/loadJob.middleware')
const { loadApplication } = require('../middleware/loadApplication.middleware')

const { createJob, getJobs, getJob, editJob, apply, getApplications, getApplication, getApplied, uploadFile } = require('../controllers/job')

router.use('/', checkUser)
router.param('jobId', loadJob)
router.param('applicationId', loadApplication)

router.post('/jobs', createJob)
router.get('/jobs', getJobs)
router.get('/jobs/:jobId', getJob)
router.put('/jobs/:jobId', editJob)

router.post('/apply/:jobId', apply)
router.get('/applied', getApplied)

router.get('/applications/:jobId', getApplications)
router.get('/application/:applicationId', getApplication)

router.post('/upload', multer().single('file'), uploadFile)

module.exports = router