const { MESSAGE, ALLOWED_EXTENSION } = require('../../utils/constant')
const { havingError, sendres } = require('../../utils/sendres')

exports.checkFileExtension = async (req, res, next) => {
  try{
    const file = req.file

    if(!file) return sendres(400, { message: MESSAGE.FILE_NOT_FOUND }, res)

    if(ALLOWED_EXTENSION.includes(file.mimetype)){
      next()
    }

    return sendres( 400, { message: MESSAGE.FILE_ERROR }, res)
  }
  catch(err){
    havingError(err, res)
  }
}