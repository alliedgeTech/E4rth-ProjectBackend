const ProjectList = require("../models/ProjectList.model");

/** Create Project Service */
const createProject = async (projectData, files) => {
  // Add file paths if they are present in the request
  if (files.project_logo) {
    projectData.project_logo = files.project_logo[0].path; // Use file path
  }

  if (files.other_document) {
    projectData.other_document = files.other_document.map((file) => file.path); // Array of paths
  }

  if (files.additional_image) {
    projectData.additional_image = files.additional_image.map(
      (file) => file.path
    ); // Array of paths
  }

  // Create new project
  const project = new ProjectList(projectData);
  return await project.save();
};

/** Update Project Service */
const updateProject = async (projectId, updateData, files) => {
  if (files.project_logo) {
    updateData.project_logo = files.project_logo[0].path; 
  }

  if (files.other_document) {
    updateData.other_document = files.other_document.map((file) => file.path); 
  }

  if (files.additional_image) {
    updateData.additional_image = files.additional_image.map(
      (file) => file.path
    ); 
  }
  return await ProjectList.findByIdAndUpdate(projectId, updateData, {
    new: true,
  });
};

const getAllProjects = async (query) => {
  const { search, fromDate, toDate } = query;

  const filters = {};
  if (search) {
    filters.project_name = { $regex: search, $options: "i" }; 
    filters.email ={$regex: search,$options:"i"};
  }
  if (fromDate || toDate) {
    filters.createdAt = {};
    if (fromDate) filters.createdAt.$gte = new Date(fromDate);
    if (toDate) filters.createdAt.$lte = new Date(toDate);
  }

  return await ProjectList.find(filters);
};

const getProjectById = async (projectId) => {
  return await ProjectList.findById(projectId);
};

const deleteProject = async (projectId) => {
  return await ProjectList.findByIdAndDelete(projectId);
};

module.exports = {
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
  deleteProject,
};
