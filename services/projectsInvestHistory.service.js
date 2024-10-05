// services/projectsInvestHistory.service.js
const ProjectsInvestHistory = require('../models/projectsInvestHistory.model');

// Create a new project investment history (buy or sell)
async function createProjectInvestment(data) {
    const { userId, projectId, token, amount, isSell, quantityToken } = data;

    if (!userId || !projectId || !token || !amount || !quantityToken) {
        throw new Error('Missing required fields');
    }

    const projectInvestment = new ProjectsInvestHistory({
        userId,
        projectId,
        token,
        amount,
        isSell,
        quantityToken
    });

    await projectInvestment.save();
    return projectInvestment;
}

// Get all investments by user
async function getInvestmentsByUser(userId) {
    return await ProjectsInvestHistory.find({ userId }).populate('projectId').exec();
}

// Get a specific investment by ID
async function getInvestmentById(id) {
    return await ProjectsInvestHistory.findById(id).populate('projectId').exec();
}

// Update an investment history (if required)
async function updateInvestment(id, data) {
    const investment = await ProjectsInvestHistory.findById(id);

    if (!investment) {
        throw new Error('Investment not found');
    }

    Object.assign(investment, data);
    investment.updatedAt = Date.now();

    await investment.save();
    return investment;
}

// Delete an investment history
async function deleteInvestment(id) {
    return await ProjectsInvestHistory.findByIdAndDelete(id);
}

module.exports = {
    createProjectInvestment,
    getInvestmentsByUser,
    getInvestmentById,
    updateInvestment,
    deleteInvestment
};
