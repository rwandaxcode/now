const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema({
  positionName: { type: String, required: true },
  requiredQualification: String
});

module.exports = mongoose.model("Position", PositionSchema);
