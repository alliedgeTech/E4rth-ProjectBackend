// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "INVESTER", "COMPANY"],
  },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  loginAttempts: { type: Number, default: 0 },
  blockExpire: { type: Date, default: null },
  image: { type: String, default: null },
  lastLogin: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
},{timestamps: true });

module.exports = mongoose.model("User", userSchema);
