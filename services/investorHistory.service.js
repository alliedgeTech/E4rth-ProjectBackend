// services/investorHistory.service.js
const InvestorHistory = require('../models/investorHistory.model');

// Create a new investment or sell entry
async function createInvestment(data) {
    const { userId, projectId, paymentId, amount, isSell } = data;

    if (!userId || !projectId || !paymentId || !amount) {
        throw new Error('Missing required fields');
    }

    const investment = new InvestorHistory({
        userId,
        projectId,
        paymentId,
        amount,
        isSell
    });

    await investment.save();
    return investment;
}

// Get all investments by user
async function getInvestmentsByUser(userId) {
    return await InvestorHistory.find({ userId }).populate('projectId').exec();
}

// Get a specific investment by ID
async function getInvestmentById(id) {
    return await InvestorHistory.findById(id).populate('projectId').exec();
}

// Update an investment (if needed)
async function updateInvestment(id, data) {
    const investment = await InvestorHistory.findById(id);

    if (!investment) {
        throw new Error('Investment not found');
    }

    Object.assign(investment, data);
    investment.updatedAt = Date.now();

    await investment.save();
    return investment;
}

// Delete an investment (if required)
async function deleteInvestment(id) {
    return await InvestorHistory.findByIdAndDelete(id);
}

module.exports = {
    createInvestment,
    getInvestmentsByUser,
    getInvestmentById,
    updateInvestment,
    deleteInvestment
};
