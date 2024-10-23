const User = require("../models/User.model"); // Adjusted the path to reflect the new model
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

/** Signup Service */
const signUp = async (userData) => {
  const { companyName, companyEmail, password, facebook, google, apple } =
    userData;
  const existingUser = await User.findOne({ companyEmail });
  if (existingUser) throw new Error("User already exists with this email");
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const user = new User({
    companyName,
    companyEmail,
    password: hashedPassword,
    facebook,
    google,
    apple,
  });

  return await user.save();
};

const login = async (companyEmail, password) => {
  const user = await User.findOne({ companyEmail });
  if (!user) throw new Error("Invalid email or password");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  const token = jwt.generateJwtToken({ id: user._id, company: user.company });
  return { token, user };
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUser = async (userId, updateData) => {
  const { password, ...restData } = updateData;

  // If password is being updated, hash it
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    restData.password = hashedPassword;
  }

  // Update user with new data (including profileImage if available)
  return await User.findByIdAndUpdate(userId, restData, { new: true });
};

/** Delete User */
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  signUp,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
