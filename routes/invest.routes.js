const express = require("express");
const investController = require("../controllers/invest.controller");
const authenticate = require("../middlewares/authmiddleware");

const router = express.Router();

// Create a new investment
router.post("/", authenticate, investController.createInvestment);

// Get all investments with filters, pagination, and date range
router.get("/", authenticate, investController.getAllInvestments);

// Get investment by ID
router.get("/:id", authenticate, investController.getInvestmentById);

// Delete investment by ID
router.delete("/:id", authenticate, investController.deleteInvestment);

module.exports = router;
