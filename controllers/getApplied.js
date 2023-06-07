const { havingError, sendres } = require('../utils/sendres')
const { Applier } = require('../modules/applier')
const { MESSAGE } = require('../utils/constant')

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
      return sendres(403, { message: MESSAGE.ONLY_EMPLOYEE })
    }
    applications = await Applier.find({ applierId: user._id }).sort({ createdAt: -1 }, projection).lean()

    sendres(200, { applications }, res)
  }
  catch(err){
    havingError(err, res)
  }
}