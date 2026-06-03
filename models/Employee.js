const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  empFirstName: String,
  empLastName: String,
  empGender: String,
  empDateOfBirth: Date,
  empEmail: String,
  empTelephone: String,
  empAddress: String,
  employmentDate: Date,

  status: {
    type: String,
    enum: ["on leave", "active", "blacklisted", "dismissed", "resigned"],
    default: "active"
  },

  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  position: { type: mongoose.Schema.Types.ObjectId, ref: "Position" }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
