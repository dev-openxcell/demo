const { MESSAGE } = require('../../utils/constant')
const { havingError, sendres } = require('../../utils/sendres')
const { getUser } = require('../user/user.service')

exports.checkDuplicate = async (req, res, next) => {
  try{
    const user = await getUser({ email: req.body.email })

    if(user) return sendres(409, { message: MESSAGE.DUPLICATE }, res)

    next()
  }
  catch(err){
    havingError(err, res)
  }
}