const userService = require('../services/userService.service');

/** Signup Controller */
const signUp = async (req, res) => {
    try {
        // Get user data from the request body
        const user = await userService.signUp(req.body); // Call the signup service
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/** Login Controller */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await userService.login(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/** Get All Users Controller */
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/** Get User by ID Controller */
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/** Update User Controller */
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await userService.updateUser(userId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/** Delete User Controller */
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
