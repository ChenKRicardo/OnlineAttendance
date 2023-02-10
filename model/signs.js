let mongoose = require('mongoose')

let signSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  time: { type: Object, required: true },
  detail: { type: Object, required: true }
}, { minimize: false })

let SignModel = mongoose.model('sign', signSchema)

module.exports = SignModel
