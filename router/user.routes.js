const router = require('express').Router()
const multer = require('multer')
const { checkUser } = require('../middleware/checkUser.middleware')
const { loadJob } = require('../middleware/loadJob.middleware')
const { loadApplier } = require('../middleware/loadApplier.middleware')
const { registerUser } = require('../controllers/registerUser')
const { login } = require('../controllers/login')
const { editProfile } = require('../controllers/editProfile')
const { createJob } = require('../controllers/createJob')
const { getJobs } = require('../controllers/getJobs')
const { getJob } = require('../controllers/getJob')
const { editJob } = require('../controllers/editJob')
const { apply } = require('../controllers/apply')
const { getAppliers } = require('../controllers/getAppliers')
const { getApplier } = require('../controllers/getApplier')
const { getApplied } = require('../controllers/getApplied')
const { getProfile } = require('../controllers/getProfile')
const { uploadFile } = require('../controllers/uploadfile')

router.param('jobId', loadJob)
router.param('applierId', loadApplier)

router.post('/register', registerUser)
router.post('/login', login)
router.use('/', checkUser)
router.get('/profile', getProfile)
router.put('/profile', editProfile)

router.post('/jobs', createJob)
router.get('/jobs', getJobs)
router.get('/jobs/:jobId', getJob)
router.put('/jobs/:jobId', editJob)

router.post('/apply/:jobId', apply)
router.get('/appliers/:jobId', getAppliers)
router.get('/applied', getApplied)

router.get('/applier/:applierId', getApplier)
// TODO: file 
router.post('/upload', multer().single('file'), uploadFile)

module.exports = router