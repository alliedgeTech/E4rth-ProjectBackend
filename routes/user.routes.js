// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user.Controller');
const authenticate = require('../middlewares/authmiddleware'); // Use if needed for authentication

const router = express.Router();

// Public Routes
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

// Protected Routes
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
