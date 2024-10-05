// routes/projectsInvestHistory.routes.js
const express = require('express');
const router = express.Router();
const projectsInvestHistoryController = require('../controllers/projectsInvestHistory.controller');

// Create a new project investment history
router.post('/', projectsInvestHistoryController.createProjectInvestment);

// Get all investments for a specific user
router.get('/user/:userId', projectsInvestHistoryController.getInvestmentsByUser);

// Get a specific investment by ID
router.get('/:id', projectsInvestHistoryController.getInvestmentById);

// Update an investment
router.put('/:id', projectsInvestHistoryController.updateInvestment);

// Delete an investment
router.delete('/:id', projectsInvestHistoryController.deleteInvestment);

module.exports = router;
