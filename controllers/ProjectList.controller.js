const projectService = require("../services/projectLis.service");

const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const files = req.files;
    const newProject = await projectService.createProject(projectData, files);
    res
      .status(201)
      .json({ message: "Project created successfully", newProject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const updateData = req.body;
    const files = req.files;

    const updatedProject = await projectService.updateProject(
      req.params.id,
      updateData,
      files
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects(req.query);
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Get Project by ID Controller */
const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Delete Project by ID Controller */
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
  deleteProject,
};
