const Joi = require('joi')

const validate = (schema) => (body) => {
  return schema.validate(body)
}

const UserRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().optional(),
  userType: Joi.string().valid('EMPLOYER','EMPLOYEE').required(),
  contactNumber: Joi.number().min(0).max(9999999999).optional(),
  contactEmail: Joi.string().email().optional(),
})

const LoginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
})

const EditProfileSchema = Joi.object({
  name: Joi.string().required(),
  contactNumber: Joi.number().min(0).optional(),
  contactEmail: Joi.string().email().optional()
})

const JobSchema = Joi.object({
  minimumExperience: Joi.number().min(0).max(50).required(),
  jobTitle: Joi.string().min(2).max(30).required(),
  jobDescrpition: Joi.string().min(15).required(),
  isCommitmentRequired: Joi.boolean().required(),
  minimumJobCommitment: Joi.number().when('isCommitmentRequired', {
    is: true,
    then: Joi.number().min(0).required(),
    otherwise: Joi.number().optional()
  }),
  paymentType: Joi.string().valid('HOURLY', 'MONTHLY').required(),
  salary: Joi.number().min(1).max(10000000).required()
})

const ApplierSchema = Joi.object({
  totalExperience: Joi.number().min(0).max(50).required(),
  linkToResume: Joi.string().uri().optional(),
  pastExperiences: Joi.array().items({
    role: Joi.string().min(2).max(30).required(),
    descripion: Joi.string().min(15).max(2000).required(),
    duration: Joi.number().precision(1).min(0),
  }).optional(),
})

exports.registerValidate = validate(UserRegisterSchema)
exports.loginValidation = validate(LoginSchema)
exports.profileValidation = validate(EditProfileSchema)
exports.jobValidation = validate(JobSchema)
exports.applierValidation = validate(ApplierSchema)
