// routes/investorHistory.routes.js
const express = require('express');
const router = express.Router();
const investorHistoryController = require('../controllers/investorHistory.controller');

// Create a new investment or sell
router.post('/', investorHistoryController.createInvestment);

// Get all investments for a specific user
router.get('/user/:userId', investorHistoryController.getInvestmentsByUser);

// Get a specific investment by ID
router.get('/:id', investorHistoryController.getInvestmentById);

// Update an investment
router.put('/:id', investorHistoryController.updateInvestment);

// Delete an investment
router.delete('/:id', investorHistoryController.deleteInvestment);

module.exports = router;
