const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required']
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  salt: {
    type: String,
  },
  userType: {
    type: String,
    enum: ['EMPLOYER', 'EMPLOYEE']
  },
  contactNumber: {
    type: String
  },
  contactEmail: {
    type: String
  }
}, { timestamps: true, versionKey: false, skipVersioning: true, collection: 'users' })

const User = mongoose.model('User', UserSchema)
module.exports = { User }