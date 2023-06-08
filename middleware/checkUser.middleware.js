const jwt = require('jsonwebtoken')
const { User } = require('../db/models/user')
const { ENV } = require('../utils/envLoader')
const { MESSAGE } = require('../utils/constant')
const { sendres, havingError } = require('../utils/sendres')

exports.checkUser = async (req, res, next) => {
  try{
    if(req.headers.authorization){
      let token = req.headers.authorization.split(' ')[1]

      if(!token) return sendres(401, { message: MESSAGE.HEADER_EMPTY }, res)

      let payload = jwt.verify(token, ENV.USER_SECRET)

      const user = await User.findById(payload.id)

      req.user = user
      next()
    }
    else{
      return sendres(401, { message: MESSAGE.HEADER_MISSING }, res)
    }
  }
  catch(err){
    havingError(err, res)
  }
}