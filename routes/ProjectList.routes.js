const express = require("express");
const projectController = require("../controllers/ProjectList.controller");
const { upload, uploadToCloudinary } = require("../config/cloudinary");
const authenticate = require("../middlewares/authmiddleware");
const router = express.Router();

const uploadFields = upload.fields([
  { name: "project_logo", maxCount: 1, uploadToCloudinary },
  { name: "other_document", maxCount: 5, uploadToCloudinary },
  { name: "additional_image", maxCount: 5, uploadToCloudinary },
]);

// Routes for creating and updating projects
router.post("/",authenticate, uploadFields, projectController.createProject);
router.put("/:id",authenticate, uploadFields, projectController.updateProject);
router.get("/",authenticate,projectController.getAllProjects);
router.get("/:id",authenticate,projectController.getProjectById);
router.delete("/:id",authenticate,projectController.deleteProject);

module.exports = router;
