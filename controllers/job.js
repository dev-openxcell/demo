const fs = require('node:fs')
const path = require('node:path')
const { Job } = require('../modules/job')
const { Application } = require('../modules/application')
const { MESSAGE, CODE } = require('../utils/constant.util')
const { havingError, sendres } = require('../utils/sendres.util')
const { applierValidation, jobValidation } = require('../utils/validator.util')

exports.apply = async (req, res) => {
  try{
    const user = req.user
    const job = req.job

    if(user.userType !== "EMPLOYEE") return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE }, res)

    const { error, value } = applierValidation(req.body)

    if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

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

    await Application.create(body)

    sendres(200, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.createJob = async (req, res) => {
  try{
    const user = req.user

    if(user.userType !== "EMPLOYER") return sendres(401, { message: MESSAGE.ONLY_EMPLOYER }, res)
    
    const { error, value } = jobValidation(req.body)

    if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

    const { minimumExperience, jobTitle, jobDescrpition, isCommitmentRequired, minimumJobCommitment, paymentType, salary} = value

    const body = {
      creatorId: user._id, 
      creatorName: user.name, 
      minimumExperience, 
      jobTitle, 
      jobDescrpition, 
      isCommitmentRequired, 
      minimumJobCommitment, 
      paymentType, 
      salary, 
    }

    await Job.create(body)

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
    
    if(user.userType !== "EMPLOYER") return sendres(401, { message: MESSAGE.ONLY_EMPLOYER }, res)
    if(user._id.toString() !== job.creatorId.toString()) return sendres(401, { message: MESSAGE.NOT_OWNER }, res)
    
    const { error, value } = jobValidation(req.body)

    if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

    const { minimumExperience, jobTitle, jobDescrpition, isCommitmentRequired, minimumJobCommitment, paymentType, salary} = value

    job.minimumExperience = minimumExperience 
    job.jobTitle = jobTitle 
    job.jobDescrpition = jobDescrpition 
    job.isCommitmentRequired = isCommitmentRequired 
    job.minimumJobCommitment = minimumJobCommitment 
    job.paymentType = paymentType 
    job.salary = salary 

    await job.save()

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

    const projection = {
      totalExperience: 1,
      jobId: 1,
      jobTitle: 1,
    }
    
    if(user.userType !== "EMPLOYEE") {
      return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE }, res)
    }
    applications = await Application.find({ applierId: user._id }, projection).sort({ createdAt: -1 }).lean()

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
    const user = req.user
    const job = req.job.toJSON()
    let applications = []

    const projection = {
      applierId: 1,
      applierName: 1,
      totalExperience: 1,
    }
    
    if(user.userType !== "EMPLOYER") {
      return sendres(401, { message: MESSAGE.ONLY_EMPLOYER })
    }
    applications = await Application.find({ employerId: user._id, jobId: job._id }, projection).sort({ createdAt: -1 }).lean()

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
    const user = req.user
    let jobs = []

    const projection = {
      creatorName: 1,
      minimumExperience: 1,
      jobTitle: 1,
      jobDescrpition: 1,
    }
    if(user.userType === "EMPLOYER") {
      jobs = await Job.find({ creatorId: user._id }, projection).sort({ createdAt: -1 }).lean()
    }
    else{
      jobs = await Job.find({}, projection).sort({ createdAt: -1 }).lean()
    }

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

    if(!file) return sendres(400, { message: MESSAGE.FILE_NOT_FOUND }, res)
    if(user.userType !== 'EMPLOYEE') return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE}, res)

    if(["application/msword", "application/pdf"].includes(file.mimetype)){
      let filepath = path.resolve(__dirname, `../uploads/${Date.now()}_${file.originalname.trim().replace(' ', "_")}`)
      fs.writeFileSync(filepath, file.buffer)

      if(user.resume){
        fs.unlinkSync(user.resume)
      }
      
      user.resume = filepath
      await user.save()
      return sendres(200, {}, res)

    }
    else{
      return sendres(200, { message: MESSAGE.FILE_ERROR }, res)
    }
  }
  catch(err){
    havingError(err, res)
  }
}