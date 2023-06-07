const { havingError, sendres } = require('../utils/sendres')

exports.getApplier = async (req, res) => {
  try{
    const applier = req.applier

    sendres(200, { applier }, res)
  }
  catch(err){
    havingError(err, res)
  }
}