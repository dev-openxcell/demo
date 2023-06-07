const { havingError, sendres } = require('../utils/sendres')
const { Applier } = require('../modules/applier')
const { MESSAGE } = require('../utils/constant')

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
      return sendres(403, { message: MESSAGE.ONLY_EMPLOYER })
    }
    applications = await Applier.find({ employerId: user._id, jobId: job._id }).sort({ createdAt: -1 }, projection).lean()

    sendres(200, { job, applications }, res)
  }
  catch(err){
    havingError(err, res)
  }
}