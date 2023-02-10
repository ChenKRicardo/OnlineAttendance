let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  pass: { type: String, required: true },
  permission: { type: Array, required: true },
  approver: { type: Array, required: true },
  head: { type: String, required: true }
})

let UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
