const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, enum: ["Applied","Interview","Offer","Rejected"], default: "Applied" },
  dateApplied: { type: Date },
  notes: { type: String }
});

module.exports = mongoose.model("Job", jobSchema);
