const router = require('express').Router()
const multer = require('multer')
const { checkUser } = require('../middleware/checkUser.middleware')
const { loadJob } = require('../middleware/loadJob.middleware')
const { loadApplier } = require('../middleware/loadApplier.middleware')

const { createJob, getJobs, getJob, editJob, apply, getAppliers, getApplier, getApplied, uploadFile } = require('../controllers/job')

router.use('/', checkUser)
router.param('jobId', loadJob)
router.param('applierId', loadApplier)

router.post('/jobs', createJob)
router.get('/jobs', getJobs)
router.get('/jobs/:jobId', getJob)
router.put('/jobs/:jobId', editJob)

router.post('/apply/:jobId', apply)
router.get('/applied', getApplied)

router.get('/appliers/:jobId', getAppliers)
router.get('/applier/:applierId', getApplier)

router.post('/upload', multer().single('file'), uploadFile)

module.exports = router