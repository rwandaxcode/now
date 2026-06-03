const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
});

module.exports = mongoose.model("User", UserSchema);
