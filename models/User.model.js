const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    contact: { type: String, required: false },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    profileImage: { type: String },
    dateOfBirth: { type: Date },
    websiteURL: { type: String },
    facebook: { type: String },
    google: { type: String },
    apple: { type: String },
    company: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
