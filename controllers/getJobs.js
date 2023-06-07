const { havingError, sendres } = require('../utils/sendres')
const { Job } = require('../modules/job')

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