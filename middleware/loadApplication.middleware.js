const { Application } = require('../db/models/application')
const { MESSAGE } = require('../utils/constant')
const { sendres, havingError } = require('../utils/sendres')

exports.loadApplication = async (req, res, next, applicationId) => {
  try{
    const projection = {
      jobId: 1,
      applierId: 1,
      totalExperience: 1,
      pastExperiences: 1,
      linkToResume: 1
    }
    
    let application = await Application.findById(applicationId, projection)
    .populate({ path: 'jobId', select: '-creatorId -creatorName' })
    .populate({ path: 'applierId', select: 'email name contactNumber contactEmail resume' })

    if(!application) return sendres(404, { message: `application ${MESSAGE.NOT_FOUND}` }, res)

    req.application = application
    next()
  }
  catch(err){
    havingError(err, res)
  }
}