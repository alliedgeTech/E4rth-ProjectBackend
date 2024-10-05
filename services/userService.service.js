const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

/** Signup Service */
const signUp = async (userData) => {
    const { firstName, lastName, password, role, email, phoneNumber } = userData; // Include lastName here

    // Check if email or phone number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) throw new Error('User already exists with this email or phone number');

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
        firstName,
        lastName, // Make sure to include lastName in user creation
        password: hashedPassword,
        role,
        email,
        phoneNumber,
    });

    return await user.save();
};

/** Login Service */
const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    // Generate JWT Token
    const token = jwt.generateJwtToken({ id: user._id, role: user.role });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return { token, user };
};

/** Get All Users */
const getAllUsers = async () => {
    return await User.find();
};

/** Get User by ID */
const getUserById = async (userId) => {
    return await User.findById(userId);
};

/** Update User */
const updateUser = async (userId, updateData) => {
    const { password, ...restData } = updateData;

    // If password is being updated, hash it
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        restData.password = hashedPassword;
    }
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
    deleteUser
};
