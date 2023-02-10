let mongoose = require('mongoose')

let newSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  applicant: { type: Boolean, defalut: false },
  approver: { type: Boolean, defalut: false }
})

let NewModel = mongoose.model('new', newSchema)

module.exports = NewModel