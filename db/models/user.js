const mongoose = require('mongoose')
const { ENUMS_ARR, MODELS } = require('../../utils/constant')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  salt: {
    type: String,
    required: [true, 'salt is required']
  },
  userType: {
    type: String,
    enum: ENUMS_ARR.USER_TYPE,
    required: [true, 'userType is required']
  },
  contactNumber: {
    type: String
  },
  contactEmail: {
    type: String
  },
  resume: {
    type: String
  }
}, { timestamps: true, versionKey: false, skipVersioning: true, collection: 'users' })

const User = mongoose.model(MODELS.USER, UserSchema)
module.exports = { User }