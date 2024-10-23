const transactionService = require('../services/transaction.service');

/** Create Transaction Controller */
const createTransaction = async (req, res) => {
  try {
    const newTransaction = await transactionService.createTransaction(req.body);
    res.status(201).json({ message: 'Transaction created successfully', newTransaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Get All Transactions with Filters, Date Range, and Pagination */
const getAllTransactions = async (req, res) => {
  try {
    const { user_id, project_id, fromDate, toDate, status, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.body;
    
    const filters = {};
    if (user_id) filters.user_id = user_id;
    if (project_id) filters.project_id = project_id;
    if (status) filters.status = status;
    
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };

    const transactions = await transactionService.getAllTransactions(filters, fromDate, toDate, parseInt(page), parseInt(limit), sort);
    
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Get Transaction by ID Controller */
const getTransactionById = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Update Transaction Status Controller */
const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTransaction = await transactionService.updateTransactionStatus(req.params.id, status);
    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction status updated successfully', updatedTransaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Delete Transaction by ID Controller */
const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionService.deleteTransaction(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionStatus,
  deleteTransaction,
};
