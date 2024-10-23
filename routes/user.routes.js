// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/user.Controller");
const { upload, uploadToCloudinary } = require("../config/cloudinary");
const authenticate = require("../middlewares/authmiddleware");
const router = express.Router();
// Public Routes
router.post("/signup", userController.signUp);
router.post("/login", userController.login);

// Protected Routes
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.put(
  "/:id",
  authenticate,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  uploadToCloudinary,
  userController.updateUser
);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;
