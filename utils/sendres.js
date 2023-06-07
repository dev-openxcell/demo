exports.sendres = async (statusCode=204, data, res) => {
  let responceData = data ? {...data} : {}
  res.status(statusCode).json(responceData)
}
exports.havingError = async (err, res) => {
  try{
    if(err.name === 'JsonWebTokenError'){
      return res.status(401).json({ message: 'not authorized signature mismatched' })
    }
    let ms = JSON.parse(err.message)
    if(ms.code === "001"){
      return res.status(400).json({ message: ms.message })
    }
    console.log(err)
    res.status(500).json({ message: err.message })
  }
  catch(error){
    res.status(500).json({ message: err.message })
  }
}