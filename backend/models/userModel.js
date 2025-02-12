// Import mongoose
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor', 'manager', 'admin'], default: 'donor' },
  bloodType: { type: String },
  bloodBank: { type: String },
}, { timestamps: true });

// Export the User model
module.exports = mongoose.model("User", UserSchema);