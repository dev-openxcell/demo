const { havingError, sendres } = require('../utils/sendres')
const { applierValidation } = require('../utils/validator')
const { Applier } = require('../modules/applier')
const { MESSAGE, CODE } = require('../utils/constant')

exports.apply = async (req, res) => {
  try{
    const user = req.user
    const job = req.job

    if(user.userType !== "EMPLOYEE") return sendres(403, { message: MESSAGE.ONLY_EMPLOYEE }, res)

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