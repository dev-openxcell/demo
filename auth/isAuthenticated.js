const jwt = require('jsonwebtoken')
const fs = require('node:fs')
const path = require('node:path')
const { getUserHydrated } = require('../modules/user/user.service')
const { MESSAGE, OPEN_URLS, EXPIRE } = require('../utils/constant')
const { sendres, havingError } = require('../utils/sendres')

const verifyToken = (token) => {
  try{
    const publi = fs.readFileSync(path.resolve(__dirname, '../ssh/public.key'), 'utf-8')

    const payload = jwt.verify(token, publi, { algorithms: ['RS256'] })

    return payload
  }
  catch(err){
    throw new Error(err)
  }
}

exports.createToken = (data) => {
  const payload = {
    userType: data.userType,
    name: data.name,
    email: data.email,
    id: data._id
  }
  const priv = fs.readFileSync(path.resolve(__dirname, '../ssh/private.key'), 'utf-8')
  return jwt.sign(payload, priv, { expiresIn: EXPIRE.LOGIN, algorithm: 'RS256' })
}

exports.isAuthenticated = async (req, res, next) => {
  try{
    if(OPEN_URLS.includes(req.originalUrl)){
      next()
    }
    else{
      if(req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1]
  
        if(!token) return sendres(401, { message: MESSAGE.HEADER_EMPTY }, res)
  
        let payload = verifyToken(token)
  
        const user = await getUserHydrated({ _id: payload.id })
  
        req.user = user
        next()
      }
      else{
        return sendres(401, { message: MESSAGE.HEADER_MISSING }, res)
      }
    }
  }
  catch(err){
    havingError(err, res)
  }
}