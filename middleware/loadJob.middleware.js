const { Job } = require('../db/models/job')
const { MESSAGE } = require('../utils/constant')
const { sendres, havingError } = require('../utils/sendres')

exports.loadJob = async (req, res, next, jobId) => {
  try{
    if(!jobId || jobId === 'undefined') return sendres(400, { message: MESSAGE.NOT_FOUND }, res )
    let job = await Job.findById(jobId)

    if(!job) return sendres(404, { message: `job ${MESSAGE.NOT_FOUND}` }, res)

    req.job = job
    next()
  }
  catch(err){
    havingError(err, res)
  }
}