const { havingError, sendres } = require('../utils/sendres')
const fs = require('node:fs')
const path = require('node:path')

exports.uploadFile = async (req, res) => {
  try{
    const file = req.file
    if(file.mimetype === "application/pdf" || file.mimetype === "application/msword"){
      // let writer = fs.createWriteStream(`../uploads/${file.originalname.trim().replace(' ', "_")}`)
      // writer.write(file.buffer);
      // writer.close()
      fs.writeFileSync(path.resolve(__dirname, `../uploads/${Date.now()}_${file.originalname.trim().replace(' ', "_")}`), file.buffer)

      return sendres(200, {}, res)
    }
    else{
      return sendres(200, { message: 'only files with extension .pdf and .doc are allowed' }, res)
    }
  }
  catch(err){
    havingError(err, res)
  }
}