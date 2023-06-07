const { MESSAGE, CODE } = require('../utils/constant')
const { havingError, sendres } = require('../utils/sendres')
const { jobValidation } = require('../utils/validator')

exports.editJob = async (req, res) => {
  try{
    const job = req.job
    const user = req.user

    if(user.userType !== "EMPLOYER") return sendres(403, { message: MESSAGE.ONLY_EMPLOYER }, res)
    if(user._id !== job.creatorId) return sendres(403, { message: MESSAGE.NOT_OWNER }, res)
    
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