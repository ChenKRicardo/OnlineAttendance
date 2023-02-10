let mongoose = require("mongoose");

let checkSchema = new mongoose.Schema({
  state: { type: String, default: "待审批" },
  applicantid: { type: String, required: true },
  applicantname: { type: String, required: true },
  approverid: { type: String, required: true },
  approvername: { type: String, required: true },
  reason: { type: String, required: true },
  time: { type: Array, required: true },
  note: { type: String, required: true },
  permission: { type: Boolean },
});

let CheckModel = mongoose.model("check", checkSchema);

module.exports = CheckModel;
