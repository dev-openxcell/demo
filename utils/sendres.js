const { ERROR_NAME } = require('./constant')

exports.sendres = async (statusCode=204, data, res) => {
  let responceData = data ? {...data} : {}
  res.status(statusCode).json(responceData)
}
exports.havingError = async (err, res) => {
  try{
    if(err.name === ERROR_NAME.TOKEN_INVALID){
      return res.status(401).json({ message: 'not authorized signature mismatched' })
    }
    if(err.name === ERROR_NAME.TOKEN_EXPIRED){
      return res.status(401).json({ message: 'token expired' })
    }
    let ms = JSON.parse(err.message)
    if(ms.code === "001"){
      return res.status(400).json({ message: ms.message })
    }
    console.log(err)
    res.status(500).json({ message: err.message })
  }
  catch(error){
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}