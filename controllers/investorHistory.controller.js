// controllers/investorHistory.controller.js
const investorHistoryService = require('../services/investorHistory.service');

// Create a new investment (buy or sell)
exports.createInvestment = async (req, res) => {
    try {
        const investment = await investorHistoryService.createInvestment(req.body);
        res.status(201).json(investment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all investments by a user
exports.getInvestmentsByUser = async (req, res) => {
    try {
        const investments = await investorHistoryService.getInvestmentsByUser(req.params.userId);
        res.status(200).json(investments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific investment by ID
exports.getInvestmentById = async (req, res) => {
    try {
        const investment = await investorHistoryService.getInvestmentById(req.params.id);
        res.status(200).json(investment);
    } catch (error) {
        res.status(404).json({ error: 'Investment not found' });
    }
};

// Update an investment
exports.updateInvestment = async (req, res) => {
    try {
        const updatedInvestment = await investorHistoryService.updateInvestment(req.params.id, req.body);
        res.status(200).json(updatedInvestment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an investment
exports.deleteInvestment = async (req, res) => {
    try {
        await investorHistoryService.deleteInvestment(req.params.id);
        res.status(200).json({ message: 'Investment deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
