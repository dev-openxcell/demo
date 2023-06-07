const { Job } = require('../modules/job')
const { MESSAGE } = require('../utils/constant')
const { sendres, havingError } = require('../utils/sendres')

exports.loadJob = async (req, res, next, jobId) => {
  try{
    let job = await Job.findById(jobId).lean()

    if(!job) return sendres(404, { message: `job ${MESSAGE.NOT_FOUND}` }, res)

    req.job = job
    next()
  }
  catch(err){
    havingError(err, res)
  }
}