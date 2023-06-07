const { CODE } = require('../utils/constant')
const { sendres, havingError } = require('../utils/sendres')
const { profileValidation } = require('../utils/validator')

exports.editProfile = async (req, res) => {
  try{
    const { error, value } = profileValidation(req.body)

    if(error) throw new Error(JSON.stringify({ code: CODE.validation, message: error.message }))

    const { name, contactNumber, contactEmail } = value

    const user = req.user

    user.name = name
    user.contactNumber = contactNumber
    user.contactEmail = contactEmail

    await user.save()

    sendres(200, {}, res)
  }
  catch(err){
    havingError(err, res)
  }
}