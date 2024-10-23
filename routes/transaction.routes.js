const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const authenticate = require("../middlewares/authmiddleware");
const router = express.Router();

// Create a new transaction
router.post("/", authenticate, transactionController.createTransaction);

// Get all transactions with filters, pagination, and date range
router.get("/", authenticate, transactionController.getAllTransactions);

// Get transaction by ID
router.get("/:id", authenticate, transactionController.getTransactionById);

// Update transaction status
router.patch(
  "/:id/status",
  authenticate,
  transactionController.updateTransactionStatus
);

// Delete transaction by ID
router.delete("/:id", authenticate, transactionController.deleteTransaction);

module.exports = router;
