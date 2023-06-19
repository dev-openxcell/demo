const fs = require('node:fs')
const path = require('node:path')
const { MESSAGE, ENUMS } = require('../../utils/constant')
const { havingError, sendres } = require('../../utils/sendres')

const validator = require('./job.validation')
const service = require('./job.service')

exports.apply = async (req, res) => {
  try{
    const user = req.user
    const job = req.job

    if(user.userType !== ENUMS.EMPLOYEE) return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE }, res)

    const value = validator.ApplicationValidation(req.body)

    const { totalExperience, pastExperiences, linkToResume } = value
    
    const body = {
      jobId: job._id,
      employerId: job.creatorId,
      applierId: user._id,
      applierName: user.name,
      jobTitle: job.jobTitle,
      totalExperience,
      pastExperiences,
      linkToResume,
    }

    await service.createApplication(body)

    sendres(200, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.createJob = async (req, res) => {
  try{
    const user = req.user

    if(user.userType !== ENUMS.EMPLOYER) return sendres(401, { message: MESSAGE.ONLY_EMPLOYER }, res)
    
    const value = validator.JobValidation(req.body)

    const { minimumExperience, jobTitle, jobDescription, isCommitmentRequired, minimumJobCommitment, paymentType, salary } = value

    const body = {
      creatorId: user._id, 
      creatorName: user.name, 
      minimumExperience, 
      jobTitle, 
      jobDescription, 
      isCommitmentRequired, 
      minimumJobCommitment, 
      paymentType, 
      salary, 
    }

    await service.createJob(body)

    sendres(201, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.editJob = async (req, res) => {
  try{
    const job = req.job
    const user = req.user
    
    if(user.userType !== ENUMS.EMPLOYER) return sendres(401, { message: MESSAGE.ONLY_EMPLOYER }, res)
    if(user._id.toString() !== job.creatorId.toString()) return sendres(401, { message: MESSAGE.NOT_OWNER }, res)
    
    const value = validator.JobValidation(req.body)

    await service.updateJob(job._id.toString(), value)

    sendres(200, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getApplied = async (req, res) => {
  try{
    const user = req.user
    let applications = []
    const { limit, skip } = req.query

    const projection = {
      totalExperience: 1,
      jobId: 1,
      jobTitle: 1,
    }
    
    if(user.userType !== ENUMS.EMPLOYEE) {
      return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE }, res)
    }
    applications = await service.getApplications({ applierId: user._id }, projection, limit ? limit : 25, skip ? skip : 0)

    sendres(200, { applications }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getApplication = async (req, res) => {
  try{
    const application = req.application

    sendres(200, { application }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getApplications = async (req, res) => {
  try{
    const { limit, skip } = req.query
    const user = req.user
    const job = req.job.toJSON()
    let applications = []

    const projection = {
      applierId: 1,
      applierName: 1,
      totalExperience: 1,
    }
    
    if(user.userType !== ENUMS.EMPLOYER) {
      return sendres(401, { message: MESSAGE.ONLY_EMPLOYER })
    }
    applications = await service.getApplications({ employerId: user._id, jobId: job._id }, projection, limit ? limit : 25, skip ? skip : 0)

    delete job.creatorName
    delete job.creatorId

    sendres(200, { job, applications }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getJob = async (req, res) => {
  try{
    const job = req.job

    sendres(200, { job }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getJobs = async (req, res) => {
  try{
    const { limit, skip } = req.query
    const user = req.user
    let jobs = []

    const projection = {
      creatorName: 1,
      minimumExperience: 1,
      jobTitle: 1,
      jobDescription: 1,
    }
    const query = {}
    if(user.userType === ENUMS.EMPLOYER) {
      Object.assign(query, { creatorId: user._id })
    }

    jobs = await service.getJobs(query, projection, limit ? limit : 25, skip ? skip : 0)
    
    sendres(200, { jobs }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.uploadFile = async (req, res) => {
  try{
    const user = req.user
    const file = req.file

    if(user.userType !== ENUMS.EMPLOYEE) return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE }, res)

    let filepath = path.resolve(__dirname, `../../uploads/${Date.now()}_${file.originalname.trim().replace(' ', "_")}`)
    fs.writeFileSync(filepath, file.buffer)

    if(user.resume){
      fs.unlinkSync(user.resume)
    }
    
    user.resume = filepath
    await user.save()
    return sendres(200, {}, res)

  }
  catch(err){
    havingError(err, res)
  }
}