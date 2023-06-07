const fs = require('node:fs')
const path = require('node:path')
const { Job } = require('../modules/job')
const { Applier } = require('../modules/applier')
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

    await Applier.create(body)

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
      return sendres(401, { message: MESSAGE.ONLY_EMPLOYEE })
    }
    applications = await Applier.find({ applierId: user._id }, projection).sort({ createdAt: -1 }).lean()

    sendres(200, { applications }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getApplier = async (req, res) => {
  try{
    const applier = req.applier

    sendres(200, { applier }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.getAppliers = async (req, res) => {
  try{
    const user = req.user
    const job = req.job
    let applications = []

    const projection = {
      applierId: 1,
      applierName: 1,
      totalExperience: 1,
    }
    
    if(user.userType !== "EMPLOYER") {
      return sendres(401, { message: MESSAGE.ONLY_EMPLOYER })
    }
    applications = await Applier.find({ employerId: user._id, jobId: job._id }, projection).sort({ createdAt: -1 }).lean()

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
      jobs = await Job.find().sort({ createdAt: -1 }, projection).lean()
    }

    sendres(200, { jobs }, res)
  }
  catch(err){
    havingError(err, res)
  }
}

exports.uploadFile = async (req, res) => {
  try{
    const file = req.file
    if(file.mimetype === "application/pdf" || file.mimetype === "application/msword"){
      fs.writeFileSync(path.resolve(__dirname, `../uploads/${Date.now()}_${file.originalname.trim().replace(' ', "_")}`), file.buffer)

      return sendres(200, {}, res)
    }
    else{
      return sendres(200, { message: 'only files with extension .pdf and .doc are allowed' }, res)
    }
  }
  catch(err){
    havingError(err, res)
  }
}