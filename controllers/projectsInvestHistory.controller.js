// controllers/projectsInvestHistory.controller.js
const projectsInvestHistoryService = require('../services/projectsInvestHistory.service');

// Create a new project investment (buy or sell)
exports.createProjectInvestment = async (req, res) => {
    try {
        const projectInvestment = await projectsInvestHistoryService.createProjectInvestment(req.body);
        res.status(201).json(projectInvestment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all project investments by a user
exports.getInvestmentsByUser = async (req, res) => {
    try {
        const investments = await projectsInvestHistoryService.getInvestmentsByUser(req.params.userId);
        res.status(200).json(investments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific investment by ID
exports.getInvestmentById = async (req, res) => {
    try {
        const investment = await projectsInvestHistoryService.getInvestmentById(req.params.id);
        res.status(200).json(investment);
    } catch (error) {
        res.status(404).json({ error: 'Investment not found' });
    }
};

// Update an investment history
exports.updateInvestment = async (req, res) => {
    try {
        const updatedInvestment = await projectsInvestHistoryService.updateInvestment(req.params.id, req.body);
        res.status(200).json(updatedInvestment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an investment history
exports.deleteInvestment = async (req, res) => {
    try {
        await projectsInvestHistoryService.deleteInvestment(req.params.id);
        res.status(200).json({ message: 'Investment deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
