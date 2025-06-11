const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
 // role: { type: String, required: true, enum: ["admin", "manager", "donor"] },
  bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  lastDonation: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
