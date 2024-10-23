const express = require('express');
const investController = require('../controllers/invest.controller');


const router = express.Router();

// Create a new investment
router.post('/investments', investController.createInvestment);

// Get all investments with filters, pagination, and date range
router.get('/investments', investController.getAllInvestments);

// Get investment by ID
router.get('/investments/:id', investController.getInvestmentById);

// Delete investment by ID
router.delete('/investments/:id', investController.deleteInvestment);

module.exports = router;
