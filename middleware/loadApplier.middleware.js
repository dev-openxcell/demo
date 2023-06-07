const { Applier } = require('../modules/applier')
const { MESSAGE } = require('../utils/constant.util')
const { sendres, havingError } = require('../utils/sendres.util')

exports.loadApplier = async (req, res, next, applierId) => {
  try{
    let applier = await Applier.findById(applierId).populate(['jobId', 'applierId', 'employerId'])

    if(!applier) return sendres(404, { message: `applier ${MESSAGE.NOT_FOUND}` }, res)

    req.applier = applier
    next()
  }
  catch(err){
    havingError(err, res)
  }
}