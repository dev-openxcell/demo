const { havingError, sendres } = require('../utils/sendres')
const { Job } = require('../modules/job')
const { jobValidation } = require('../utils/validator')
const { MESSAGE, CODE } = require('../utils/constant')

exports.createJob = async (req, res) => {
  try{
    const user = req.user

    if(user.userType !== "EMPLOYER") return sendres(403, { message: MESSAGE.ONLY_EMPLOYER }, res)
    
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