const { sendres, havingError } = require('../utils/sendres')

exports.getProfile = async (req, res) => {
  try{
    let user = req.user.toJSON()

    delete user.password
    delete user.salt

    sendres(200, { user }, res)
  }
  catch(err){
    havingError(err, res)
  }
}