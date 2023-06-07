const { Job } = require('../modules/job')
const { MESSAGE } = require('../utils/constant.util')
const { sendres, havingError } = require('../utils/sendres.util')

exports.loadJob = async (req, res, next, jobId) => {
  try{
    let job = await Job.findById(jobId)

    if(!job) return sendres(404, { message: `job ${MESSAGE.NOT_FOUND}` }, res)

    req.job = job
    next()
  }
  catch(err){
    havingError(err, res)
  }
}