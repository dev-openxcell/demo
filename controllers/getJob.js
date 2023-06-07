const { havingError, sendres } = require('../utils/sendres')

exports.getJob = async (req, res) => {
  try{
    const job = req.job

    sendres(200, { job }, res)
  }
  catch(err){
    havingError(err, res)
  }
}